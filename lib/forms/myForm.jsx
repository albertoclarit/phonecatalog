
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import React, { useEffect, useMemo } from "react";
import { Alert } from '@material-ui/lab';
import {FormControl} from "@material-ui/core";


export default function MyForm({ methods, ...props }) {


    if (!methods) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        methods = useForm({
            defaultValues: {
            }
        });
    }


    // in form  error={(props.errormsg !== undefined) || (Object.keys(methods.errors).length > 0)}
    return <FormProvider {...methods}  >
        <form {...props}
                     autoComplete="off"
              onSubmit={methods.handleSubmit(props.onSubmit)}
        >
            {props.children}
            {
                (props.errormsg || methods?.errors?.length > 0) ?
                    <Alert severity="warning">{props.errormsg || 'Please specify form requirements'}</Alert>
                    :
                    null
            }

        </form>
    </FormProvider>

};

