import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const customDialog = ({open, children, title, contextText, handleContinue}) => {
  return (
    <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
            <DialogContentText>
                {contextText}
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleContinue}> Continue </Button>
        </DialogActions>
    </Dialog>
  )
}

export default customDialog