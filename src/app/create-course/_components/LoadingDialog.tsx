import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"
const LoadingDialog = ({ loading }: any) => {
    return (
        <div>
            <AlertDialog open={loading}>

                <AlertDialogContent>
                    <AlertDialogHeader>

                        <AlertDialogDescription>
                            <p className='font-bold '>Please wait while generating your course...</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default LoadingDialog