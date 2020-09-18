import React, { PureComponent } from 'react';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltipContent = function(props){
  if(props.payload != null && props.payload[0] != null){
    const newPayload = [];
    props.payload.forEach(function(k){
      if(k['dataKey'] !== 'low' || k['dataKey'] !== 'high' || k['dataKey'] !== 'veryhigh' || k['dataKey'] !== 'severe'){
        newPayload.push(k);
      }
    });
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }
  return <DefaultTooltipContent {...props}/>;
}
export {CustomTooltipContent}