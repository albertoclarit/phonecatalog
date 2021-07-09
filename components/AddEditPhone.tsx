import {Dialog, Button,DialogContent, DialogTitle, makeStyles,Grid,DialogActions} from "@material-ui/core";

import { useForm } from "react-hook-form";
import MyForm from '../lib/forms/myForm'
import FormInput from '../lib/forms/formInput'
import {fetcher} from "../pages/api/utils/fetcher";
import {useConfirmationAlert} from "../lib/dialogHook";
import {useState} from "react";
const useStyles = makeStyles({
    dialog: {
        '& .MuiPaper-rounded': {
            borderRadius: '10px',
            maxWidth: '890px',
        },
    },
    dialogTitle: {
        color: '#606060',
        fontFamily: 'Gilroy',
        fontWeight: 600,
        fontSize: '1.286rem',
        lineHeight: '24px',
        padding: '32px 32px 16px 32px',
    },
    dialogContent: {
        padding: '0 32px',
    },
    dialogActions: {
        padding: '40px 32px 24px 32px',
    },
    cancelBtn: {
        color: '#606060',
        fontSize: '1rem', /**14px**/
        padding: '6px 16px',
        marginRight: '8px',
        lineHeight: '24px',
        letterSpacing: '1%',
    },
    addCallTypeBtn: {
        fontSize: '1rem', /**14px**/
        lineHeight: '24px',
        letterSpacing: '1%',
    },
});


export default function AddEditPhone({entity,hide}){
    const classes = useStyles();
    const showAlertConfirm = useConfirmationAlert();

    const [fileUpload,setFileUpload] = useState(null);
    const methods = useForm({
        defaultValues: {
            id: entity?.id || undefined
        },
    });
    const onSubmit = async (formData)=>{


       // console.log(fileUpload)

        let response = await fetcher(`
      mutation (
            $id:String,
            $name:String,
            $manufacturer:String,
            $description:String,
            $color:String,
            $price:Float,
            $imageFileName:String,
            $screen:String,
            $processor:String,
            $ram: Int
            ) {
        upsertPhone(
            id:$id,
            name:$name,
            manufacturer:$manufacturer,
            description:$description,
            color:$color,
            price:$price,
            imageFileName:$imageFileName,
            screen:$screen,
            processor:$processor,
            ram: $ram
            ) {
          id
         }
      }`,
            {
                ...formData,
                price: parseFloat(formData.price),
                ram: parseInt(formData.ram)
            }
        );


        if(fileUpload){
            const photoForm = new FormData();
            photoForm.append('id', entity.id || '');
            photoForm.append('file', fileUpload)
            let photoUploadResponse = await fetch(  '/api/uploadPhoto', {
                method: 'POST',
                credentials: 'include',
                body: photoForm,
            });
        }



        hide(true);
    }

    const handlePhotoUploadPreview = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            let file = event.target.files[0];

            if (!file.name.match(/.(jpg|jpeg|png)$/i)) {
                showAlertConfirm({
                    title: 'Invalid File Upload',
                    message: 'Please upload an image file (jpg, jpeg, png)',
                    confirmButtonTitle: 'OK'
                });
            } else if (file.size > 1000000) {
                showAlertConfirm({
                    title: 'Invalid Image Upload',
                    message: 'The image uploaded is too large. Please upload an image with size less than 1 MB',
                    confirmButtonTitle: 'OK'
                });
            } else {
                reader.onloadend = () => {
                    setFileUpload(file);
                };
                reader.readAsDataURL(file);
            }
        }
    };
    return <Dialog   fullWidth={true} open onClose={() => hide(false)} >
            <DialogTitle className={classes.dialogTitle}>
                {entity.id ? "Edit" : "Add"} Phone Info
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <MyForm methods={methods} noValidate onSubmit={onSubmit}>
                    <Grid container >
                        <Grid item xs={12}>
                            <FormInput
                                custom={null}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Phone Name"
                                name="name"
                                autoComplete="false"
                                defaultValue={entity?.name}
                                rules={{
                                    required: 'Please Enter Phone Name'
                                }}
                            />
                            <FormInput
                                custom={null}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Phone Manufacturer"
                                name="manufacturer"
                                autoComplete="false"
                                defaultValue={entity?.manufacturer}
                                rules={{
                                    required: 'Please Enter Phone Manufacturer'
                                }}
                            />

                            <FormInput
                                custom={null}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Description"
                                name="description"
                                autoComplete="false"
                                defaultValue={entity?.description}
                                rules={{
                                    required: 'Please Enter Description'
                                }}
                            />

                            <FormInput
                                custom={null}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Color"
                                name="color"
                                autoComplete="false"
                                defaultValue={entity?.color}
                                rules={{
                                    required: 'Please Enter Color'
                                }}
                            />
                            <FormInput
                                custom={null}
                                type={"number"}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Price"
                                name="price"
                                autoComplete="false"
                                defaultValue={entity?.price}
                                rules={{
                                    required: 'Please Enter Price'
                                }}
                            />
                            <FormInput
                                custom={null}

                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Screen Size"
                                name="screen"
                                autoComplete="false"
                                defaultValue={entity?.screen}
                                rules={{
                                    required: 'Please Enter Screen Size'
                                }}
                            />

                            <FormInput
                                custom={null}

                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Processor"
                                name="processor"
                                autoComplete="false"
                                defaultValue={entity?.processor}
                                rules={{
                                    required: 'Please Enter Processor'
                                }}
                            />

                            <FormInput
                                custom={null}
                                type={"number"}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="RAM"
                                name="ram"
                                autoComplete="false"
                                defaultValue={entity?.ram}
                                rules={{
                                    required: 'Please Enter RAM'
                                }}
                            />

                            Photo Upload:<br/>
                            <input
                                id='phonePhoto'
                                name='phonePhoto'
                                type='file'
                                accept='image/*'
                                onChange={(e) => handlePhotoUploadPreview(e)}
                            />
                        </Grid>
                    </Grid>
                    <button id={"hiddenbutton"} style={{ visibility: 'hidden' }} type={"submit"}>Submit</button>
                </MyForm>
            </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button className={classes.cancelBtn} onClick={() => hide(false)} color="primary">
                        CANCEL
                    </Button>

                    {
                        entity.id ?
                            <Button variant="contained"   onClick={() =>{

                                showAlertConfirm({
                                    title: "Delete Phone Detail",
                                    message: "Are you sure you want to delete this phone?",
                                    cancelButtonTitle: "CANCEL",
                                    confirmButtonTitle: "DELETE"
                                }, async (result) => {

                                    if(result){
                                        let response = await fetcher(`
                                      mutation (
                                            $id:String
                                            ) {
                                        deletePhone(
                                            id:$id 
                                            )
                                      }
      `,
                                            {
                                                 id:entity.id
                                            }
                                        );

                                        hide(true)
                                    }



                                })


                            }} color="secondary">
                                DELETE
                            </Button>
                            :null
                    }

                    <Button
                        className={classes.addCallTypeBtn}
                        variant="contained"
                        onClick={() => {
                            document.getElementById('hiddenbutton').click();
                        }}
                        color="primary"
                        autoFocus>
                        {entity.id ? "EDIT" : "ADD"} Phone Details
                    </Button>
                </DialogActions>
        </Dialog>

}
