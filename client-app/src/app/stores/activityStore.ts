import { action, computed, configure, observable, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IActivity } from './../models/activity';

configure({ enforceActions: 'always' });

class ActivityStore {

    @observable activitiesRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activitiesRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;

        try {
            const activities = await agent.Activities.list();

            runInAction('loading activities', () => {
                activities.forEach((activity: IActivity) => {
                    activity.date = activity.date.split('.')[0];
                    this.activitiesRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            });

        } catch (error) {
            console.log(error);
            runInAction('load activities errors', () => this.loadingInitial = false);

        }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);

            runInAction('creating activity', () => {
                this.activitiesRegistry.set(activity.id, activity);
                this.submitting = this.editMode = false;
            });

        } catch (error) {
            console.log(error);
            runInAction('create activity error', () => {
                this.submitting = false;
            });

        }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing activity', () => {
                this.activitiesRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.submitting = this.editMode = false;
            });

        } catch (error) {
            console.log(error);
            runInAction('edit activity error', () => {
                this.submitting = false;
            });
        }
    };

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Activities.delete(id);
            runInAction('deleting activity', () => {
                this.activitiesRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (error) {
            console.log(error);
            runInAction('delete activity error', () => {
                this.submitting = false;
                this.target = '';
            });
        }
    };

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    };

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
        this.editMode = false;
    };

    @action toggleEditFrom = (id?: string, editMode = true) => {
        if (id) {
            this.selectedActivity = this.activitiesRegistry.get(id);
        }
        this.editMode = editMode;
    };

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
        this.editMode = false;
    };
}

export default createContext(new ActivityStore());
