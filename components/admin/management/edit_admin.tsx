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
import { Dispatch, SetStateAction } from "react";

interface IAdmin {
  id: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface IEditAdmin {
  selectedAdmin: IAdmin | null;
  setSelectedAdmin:Dispatch<SetStateAction<IAdmin | null>>;
  admin:IAdmin
}
const EditAdmin = ({ selectedAdmin, setSelectedAdmin,admin }: IEditAdmin) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger >
          <Button asChild
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedAdmin(admin);
            }}
          >
            <Edit size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
            <DialogDescription>
              Update administrator role or status
            </DialogDescription>
          </DialogHeader>
          {selectedAdmin && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Username</label>
                <Input
                  value={selectedAdmin.username}
                  disabled
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input value={selectedAdmin.email} disabled className="mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium">Role</label>
                <Select defaultValue={selectedAdmin.role}>
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

              <div className="flex gap-2 pt-4">
                <DialogClose>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="flex-1">Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditAdmin;
