import { useFormContext, Controller } from 'react-hook-form'
import React from "react";
import {FormControl, FormHelperText, Input, InputLabel, TextField} from "@material-ui/core";

const FormInput = ({ custom, ...tprops }) => {


    const props = {
        ...tprops,
        defaultValue: tprops.defaultValue || undefined // this will hide warning about uncontrolled component getting a null .. either be '' or undefined
    };
    if (custom) {


        const {defaultValue,name,rules,margin,...rest} = props;
        return  <Controller
            defaultValue={props.defaultValue}
            name={props.name}
            rules={rules}
            render={(args) => {

                const  {
                    field:{ onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                } = args

                let component = React.createElement(custom,{
                    ...rest,
                    onChange,
                    value: value || '',
                    error: (!!error?.message)
                }, props.children || null);


                return <FormControl margin={margin}    {...rest}>
                    <InputLabel error={(!!error?.message)}>{rest?.label}</InputLabel>
                    {component}
                    {
                        error?.message ?
                            <FormHelperText error>{error?.message}</FormHelperText>
                            :
                            null
                    }

                </FormControl>


            }
            }
        />






    }
    else {
        const {defaultValue,name,rules,...rest} = props;

        return  <Controller
            defaultValue={props.defaultValue}
            name={props.name}
            rules={rules}
            render={(args) => {

              const  {
                    field:{ onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                } = args


                    return <TextField
                        onChange={onChange} value={value || ""}
                        {...rest}
                        error={!!error?.message}
                        helperText={error?.message}
                    />

             }
            }
        />


    }

};

export default FormInput;
