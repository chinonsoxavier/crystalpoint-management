"use client";

import { useAdminManagementStore } from '@/app/admin/(routes)/management/_management_store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

const CreateAdmin = () => {
    const {createAdmin,isCreatingAdmin}= useAdminManagementStore();
    const [role,setRole] = useState('admin');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [email, setEmail] = useState("");

    const handleCreateAdmin = (e:React.FormEvent)=>{
        e.preventDefault();
        createAdmin({email,username,password,role})
    }

  return (
    <Dialog>
        <DialogTrigger>
          <Button asChild>
            <div className='text-white' >
              <Plus size={18} className="mr-" />
              Create Admin
            </div>
          </Button>
        </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Admin</DialogTitle>
          <DialogDescription>Add a new administrator account</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <Input required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter username"
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter email address"
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <Input required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Role</label>
            <Select value={role} onValueChange={setRole} defaultValue="admin">
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
              <Button asChild variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
             
              className="flex-1"
              disabled={isCreatingAdmin}
            >
              {isCreatingAdmin ? (
                <>
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 text-white"></div> CREATING ADMIN
              </>
              ) : "Create Admin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAdmin