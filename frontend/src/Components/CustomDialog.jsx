import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// go to https://mui.com/material-ui/react-dialog/, for reference

const CustomDialog = ({open, children, title, contentText, handleContinue}) => {
  return (
    <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
            <DialogContentText>
                {contentText}
            </DialogContentText>
        </DialogContent>
        {children}
        <DialogActions>
            <Button onClick={handleContinue}> Continue </Button>
        </DialogActions>
    </Dialog>
  )
}

export default CustomDialog