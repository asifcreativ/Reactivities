import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface IProp {
    openCreateForm: () => void;
}

export const NavBar: React.FC<IProp> = ({ openCreateForm }) => {


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
    )
}
