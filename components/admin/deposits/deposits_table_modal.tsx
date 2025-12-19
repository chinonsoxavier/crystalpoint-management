import { IDeposit } from '@/app/admin/(routes)/deposits/admin_deposit_store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react'

interface IDepsitsTableModal {
  showActionModal: boolean;
  setShowActionModal:Dispatch<SetStateAction<boolean>>;
  action:'confirm' | 'reject' | null,
  selectedDeposit: IDeposit | null
}

const DepositsTableModal = ({showActionModal,setShowActionModal,action,selectedDeposit}:IDepsitsTableModal) => {
  return (
  <div>
      <Dialog open={showActionModal} onOpenChange={setShowActionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "confirm" ? "Confirm Deposit" : "Reject Deposit"}
            </DialogTitle>
            <DialogDescription>
              {action === "confirm"
                ? "Confirm this deposit transaction"
                : "Reject this deposit transaction"}
            </DialogDescription>
          </DialogHeader>
          {selectedDeposit && (
            <div className="space-y-4">
              <div className="bg-secondary p-4 rounded">
                <p className="text-sm text-muted-foreground">Deposit Amount</p>
                <p className="text-2xl font-bold">
                  ${selectedDeposit.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User</p>
                <p className="font-semibold">{selectedDeposit.user.username}</p>
              </div>
              {action === "reject" && (
                <Input placeholder="Reason for rejection" />
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowActionModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowActionModal(false)}
                  className={
                    action === "confirm"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }
                >
                  {action === "confirm" ? "Confirm" : "Reject"} Deposit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>  
                  </div>
      )
}

export default DepositsTableModal