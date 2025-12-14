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
import { Edit, Eye } from "lucide-react";
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
const ViewAdminDetails = ({ selectedAdmin, setSelectedAdmin,admin }: IEditAdmin) => {return (
  <Dialog >
    <DialogTrigger  >
        <Button asChild size='sm' >

<Eye size={15} />  
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
            <p className="font-semibold">
              {selectedAdmin.role.replace("_", " ")}
            </p>
          </div>
    
          <div>
            <p className="text-sm text-muted-foreground">Created At</p>
            <p className="font-semibold">{selectedAdmin.createdAt}</p>
          </div>
       
        </div>
      )}
    </DialogContent>
  </Dialog>
);};

export default ViewAdminDetails;