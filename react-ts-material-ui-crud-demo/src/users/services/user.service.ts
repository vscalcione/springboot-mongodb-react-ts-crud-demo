import http from '../../http-common';
import IUserData from '../types/user.type';

class UserDataService {

    getAll = () => {
        return http.get('/users');
    }

    get(id: string) {
        return http.get(`/users/${id}`);
    }

    create = (data: IUserData) => {
        return http.post('/users', data);
    }
    
    update = (data: IUserData, id: any) => {
        return http.put(`/users/${id}`, data);
    }

    delete = (id: any) => {
        return http.delete(`/users/${id}`);
    }

    deleteAll = () => {
        return http.delete('/users');
    }

    findByUsername(username: string) {
        return http.get(`/users?username=${username}`);
    }
}
export default new UserDataService();