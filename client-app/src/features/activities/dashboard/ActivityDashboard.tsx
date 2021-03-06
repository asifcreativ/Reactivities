import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

const ActivityDashboard: React.FC = () => {

    const { editMode, selectedActivity } = useContext(ActivityStore);

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails />}
                {editMode && <ActivityForm key={(selectedActivity && selectedActivity.id) || 0} />}
            </Grid.Column>

        </Grid>
    );
};

export default observer(ActivityDashboard);