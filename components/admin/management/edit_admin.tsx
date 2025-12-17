"use client";

import { useAdminManagementStore } from "@/app/admin/(routes)/management/_management_store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IAdmin {
  _id: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface IEditAdmin {
  selectedAdmin: IAdmin | null;
  setSelectedAdmin: Dispatch<SetStateAction<IAdmin | null>>;
  admin: IAdmin;
}

const EditAdmin = ({ selectedAdmin, setSelectedAdmin, admin }: IEditAdmin) => {
    const {updateAdminStatus,isUpdatingAdminStatus} = useAdminManagementStore();
  // Local state to track the editable status
  const [localStatus, setLocalStatus] = useState<boolean>(admin.isActive);

  // Sync local state whenever selectedAdmin changes (i.e., when modal opens with a new admin)
  useEffect(() => {
    if (selectedAdmin) {
      setLocalStatus(selectedAdmin.isActive);
    }
  }, [selectedAdmin]);

  // Determine if status has changed
  const hasStatusChanged = selectedAdmin
    ? localStatus !== selectedAdmin.isActive
    : false;

  const handleSave = () => {
    if (!selectedAdmin || !hasStatusChanged) return;
    updateAdminStatus(selectedAdmin._id, localStatus);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedAdmin(admin)}
          >
            <Edit size={16} />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
            <DialogDescription>Update administrator status</DialogDescription>
          </DialogHeader>

          {selectedAdmin && (
            <div className="space-y-6 pt-4">
              {/* Read-only fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Username
                  </label>
                  <Input
                    value={selectedAdmin.username}
                    disabled
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <Input
                    value={selectedAdmin.email}
                    disabled
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Role and Status */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Select defaultValue={selectedAdmin.role} disabled>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={localStatus ? "true" : "false"}
                    onValueChange={(value) => setLocalStatus(value === "true")}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button
                  onClick={handleSave}
                  disabled={!hasStatusChanged || isUpdatingAdminStatus}
                  className="min-w-32"
                >
                    {
                        isUpdatingAdminStatus ? "SAVING CHANGES ": 'SAVE CHANGES'
                    }
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditAdmin;
