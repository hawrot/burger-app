import Raact from 'react';
import Aux from '../../hoc/Aux';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SlideDrawer, Backdrop</div>
        <main>
            {props.childer}
        </main>
    </Aux>
);

export default layout;



