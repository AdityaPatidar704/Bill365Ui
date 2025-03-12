export function ButtonComponent(props){
    const handleNoNeed=()=>{

    }
    return(
        <button className={props.className} onClick={props.onClick?props.onClick:undefined} value={props.value}>{props.label}</button>
    )
}