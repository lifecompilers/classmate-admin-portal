import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }}))

const CircularLoader = () => {
    const classes = useStyles();
    return(
        <CircularProgress size={24} className={classes.root} />
    )
}
export default CircularLoader;