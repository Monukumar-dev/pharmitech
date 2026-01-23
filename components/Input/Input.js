//import { Tooltip } from 'antd';
import { useState } from 'react';
import { notUndefinedAndNull, undefinedOrNull } from "../../utils/Validation";


import './style.scss';

const openEyeIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="eye">
        <g id="Icon">
          <path d="M1.61342 8.47513C1.52262 8.33137 1.47723 8.25949 1.45182 8.14862C1.43273 8.06534 1.43273 7.93401 1.45182 7.85073C1.47723 7.73986 1.52262 7.66798 1.61341 7.52422C2.36369 6.33624 4.59693 3.33301 8.00027 3.33301C11.4036 3.33301 13.6369 6.33623 14.3871 7.52422C14.4779 7.66798 14.5233 7.73986 14.5487 7.85073C14.5678 7.93401 14.5678 8.06534 14.5487 8.14862C14.5233 8.25949 14.4779 8.33137 14.3871 8.47513C13.6369 9.66311 11.4036 12.6663 8.00027 12.6663C4.59693 12.6663 2.36369 9.66311 1.61342 8.47513Z" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.00027 9.99967C9.10484 9.99967 10.0003 9.10424 10.0003 7.99967C10.0003 6.89511 9.10484 5.99967 8.00027 5.99967C6.8957 5.99967 6.00027 6.89511 6.00027 7.99967C6.00027 9.10424 6.8957 9.99967 8.00027 9.99967Z" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}

const closeEyeIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="eye-off">
        <path id="Icon" d="M7.16196 3.39488C7.4329 3.35482 7.7124 3.33333 8.00028 3.33333C11.4036 3.33333 13.6369 6.33656 14.3871 7.52455C14.4779 7.66833 14.5233 7.74023 14.5488 7.85112C14.5678 7.93439 14.5678 8.06578 14.5487 8.14905C14.5233 8.25993 14.4776 8.3323 14.3861 8.47705C14.1862 8.79343 13.8814 9.23807 13.4777 9.7203M4.48288 4.47669C3.0415 5.45447 2.06297 6.81292 1.61407 7.52352C1.52286 7.66791 1.47725 7.74011 1.45183 7.85099C1.43273 7.93426 1.43272 8.06563 1.45181 8.14891C1.47722 8.25979 1.52262 8.33168 1.61342 8.47545C2.36369 9.66344 4.59694 12.6667 8.00028 12.6667C9.37255 12.6667 10.5546 12.1784 11.5259 11.5177M2.00028 2L14.0003 14M6.58606 6.58579C6.22413 6.94772 6.00028 7.44772 6.00028 8C6.00028 9.10457 6.89571 10 8.00028 10C8.55256 10 9.05256 9.77614 9.41449 9.41421" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export default function Input(props) {

    const [isFocus, setIsFocus] = useState(false);
    
    const disabledStyles = props.disabled ? "input-disabled" : "";

    // const openEyeStyle = {
    //   background: `url(${openEyeIcon}) 0 0 no-repeat`,
    // };
  
    // const closeEyeStyle = {
    //   background: `url(${openCloseIcon}) 0 0 no-repeat`,
    // };

    const bgIconStyle = props.bgIcon
    ? {
        paddingLeft: '44px',
        background: `url(${props.bgIcon}) 16px center no-repeat`,
      }
    : {};


    const  onChange=(e)=>{

        let {type, decimal, max,maxLengthNumber} = props;
    
        if(type === 'number'){ 
          let val = e.target.value;
          let value = val;
          
          if(decimal){
            val = val.replace(/([^0-9.]+)/, "");
            val = val.replace(/^(0|\.)/, "");
            const match = /(\d{0,7})[^.]*((?:\.\d{0,2})?)/g.exec(val);
            value = match[1] + match[2];
          }
    
          if(notUndefinedAndNull(max) && parseFloat(value) > parseFloat(max)){
            value = max;
          }
    
          if(notUndefinedAndNull(maxLengthNumber) && value.length >maxLengthNumber){
            return false
          }
    
          e.target.value=value;
        }
        props.onChange(e);
    }

    const onBlur=(e) =>{
      setIsFocus(false);
      props.onBlurInputField && props.onBlurInputField(e)
    }

    const getInput=()=>{
        return(
          <input id={props.inputId}
            className={`form-control ${props.className} ${disabledStyles}`}
              style={{ ...props.style, ...bgIconStyle }}
              type={props.type}
              step={props.step}
              min={props.min}
              max={props.max}
              minLength={props.minLength}
              maxLength={props.maxLength}
              required={props.required}
              value={props.value}
              onChange={onChange}
              onClick={props.onClick}
              multiple={props.multiple}
              disabled={props.disabled}
              onKeyUp={props.onKeyUp}
              onKeyDown={props.onKeyDown}
              onFocus={() => setIsFocus(true)}
              onBlur={(e) => onBlur(e)}
              onCopy={props.onCopy}
              onPaste={props.onPaste}
              autoComplete={props.autoComplete}
              placeholder={props.placeholder}
              accept={props.accept}
              name={props.name}
              onKeyPress={props.onKeyPress}
            />
        )
    }

    return (
        <div className={`form-group ${props.parentWidth}${ props.errorMessage ? 'error-field' : isFocus ? 'input-focus' : '' } ${props.formGroupClassName || ''}`} >
            {props.forgotPassword && props.forgotPassword}
            {props.label && (
              <label className={`form-label ${props.labelClassName}`}> {props.label} {props.required && <em className='f-16 required'>*</em>}
              </label>
            )}
              {/* {props.tooltipTitle &&<Tooltip trigger={"click"} placement={props.tooltipPlacement} color={props.tooltipColor} title={props.tooltipTitle}>
                {getInput()}
              </Tooltip>} */}

              {undefinedOrNull(props.tooltipTitle) &&getInput()}
              {props.showEyeIcon&&
                <span onClick={props.onClickEye} className='eye'>
                  {(props.type==="password") ? closeEyeIcon()  :  openEyeIcon()}
                </span>}
            {props.errorMessage && <div className='error'>{props.errorMessage}</div>}
            {props.helpText && <div className='text-xs text-gray-400'>{props.helpText}</div>}
        </div>
    )
}
