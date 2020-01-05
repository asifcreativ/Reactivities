import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';


const NavBar: React.FC = () => {

    const { openCreateForm } = useContext(ActivityStore);

    return (
        <div>
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item header>
                        <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name='Activity' />
                    <Menu.Item >
                        <Button positive content='Create Activity' onClick={() => openCreateForm()} />
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    );
};

export default observer(NavBar);