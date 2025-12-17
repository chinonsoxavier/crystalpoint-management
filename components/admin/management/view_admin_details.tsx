"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/utility/format_date";
import {  Eye } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface IAdmin {
  _id: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface IEditAdmin {
  admin: IAdmin | null;
  setSelectedAdmin: Dispatch<SetStateAction<IAdmin | null>>;
  selectedAdmin: IAdmin | null;
}
const ViewAdminDetails = ({
  admin,
  setSelectedAdmin,
  selectedAdmin,
}: IEditAdmin) => {
    
  return (
    <Dialog>
      <DialogTrigger>
        <Button asChild size="sm" onClick={() => setSelectedAdmin(admin)}>
          <div>
            <Eye size={15} />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Details</DialogTitle>
          <DialogDescription>View administrator information</DialogDescription>
        </DialogHeader>
        {selectedAdmin && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="font-semibold">{selectedAdmin.username}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold">{selectedAdmin.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-semibold">{selectedAdmin.role.replace("_", " ")}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-semibold">{formatDate(selectedAdmin.createdAt)}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewAdminDetails;
