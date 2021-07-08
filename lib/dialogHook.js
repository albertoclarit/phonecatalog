import { useState } from "react";
import { useModal } from "react-modal-hook";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  dialogActions: {
    padding: '0 32px 24px 32px',
  },
  cancelBtn: {
    color: '#606060',
    fontSize: '1rem', /**14px**/
    padding: '6px 16px',
    marginRight: '8px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
  },
  confirmBtn: {
    fontSize: '1rem',
    lineHeight: '16px',
    letterSpacing: '1.25px',
  },
});

export default function dialogHook(Component) {


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [myProps, setMyProps] = useState({});


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, hide] = useModal(() => {
    return <Component

      hide={(args) => {
        hide();
        if (myProps.onCloseCallback)
          myProps.onCloseCallback(args);
      }}
      {...myProps}

    />
  }, [myProps]);


  return (props, onCloseCallback) => {

    let tprops = props || {};
    if (onCloseCallback)
      tprops.onCloseCallback = onCloseCallback;

    setMyProps(tprops);

    show();

  }


}


export function useConfirmationAlert() {
  const classes = useStyles();
  const [myProps, setMyProps] = useState({});

  const [show, hide] = useModal(() => {
    return <Dialog maxWidth={"sm"} fullWidth={true} open onClose={() => {
      if (myProps.onCloseCallback)
        myProps.onCloseCallback(false)

      hide()
    }
    }>
      <DialogTitle> {myProps?.title || 'Title'}</DialogTitle>
      <DialogContent>

        <Typography gutterBottom>
          {myProps?.message}
        </Typography>

      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {
          myProps?.cancelButtonTitle ?
            <Button
              color="primary"
              className={classes.cancelBtn}
              onClick={() => {
                if (myProps.onCloseCallback)
                  myProps.onCloseCallback(false)

                hide()
              }}>
              {myProps?.cancelButtonTitle || "Disagree"}
            </Button>
            :
            false
        }
        <Button
          color="primary"
          className={classes.confirmBtn}
          variant={"contained"}
          onClick={() => {
            if (myProps.onCloseCallback)
              myProps.onCloseCallback(true)

            hide()
          }}>
          {myProps?.confirmButtonTitle || "Agree"}
        </Button>

      </DialogActions>
    </Dialog>

  }, [myProps]);


  return (props, onCloseCallback) => {

    let tprops = props || {};
    if (onCloseCallback)
      tprops.onCloseCallback = onCloseCallback;

    setMyProps(tprops);

    show();

  }


}

