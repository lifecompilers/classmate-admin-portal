import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}))

const Loader = ({ size }) => {
    const classes = useStyles();
    return (
        <CircularProgress size={size || 64} className={classes.root} />
    )
}
export default Loader;