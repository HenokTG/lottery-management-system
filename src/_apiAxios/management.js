import { axiosInstance } from '../utils/axios';

export const fetchUsers = (fetchAPI, setLoading, setUsersList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      console.log(res.data.data);

      const USERS =
        res.data.data !== undefined
          ? res.data.data.map((user) => {
              const newUser = {
                id: user.id,
                userName: `${user.first_name} ${user.last_name}`,
                email: user.email,
                phoneNumber: user.phone,
                role: user.role ? user.role.name : 'no role assigned',
                status: user.is_active ? 'Active' : 'Inactive',
                statusBool: user.is_active,
                operator: user.operator ? user.operator.name : 'not linked',
                createdAt: new Date(user.created_at),
              };

              return newUser;
            })
          : [];

      setLoading(false);
      setUsersList(USERS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setUsersList([]);
    });
};

export const userUpdateFetch = (fetchAPI, setUser, setLoading) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setUser({
        firstName: res.data.first_name ? res.data.first_name : '',
        lastName: res.data.last_name ? res.data.last_name : '',
        email: res.data.email ? res.data.email : '',
        phoneNumber: res.data.phone ? res.data.phone : '',
        userRole: res.data.role ? res.data.role.id : '',
      });
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};

export const fetchRoles = (fetchAPI, setLoading, setRolesList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      console.log(res.data.data);

      const ROLES =
        res.data.data !== undefined
          ? res.data.data.map((role) => {
              const newRole = {
                id: role.id,
                role: role.name,
                description: role.description,
                status: role.is_active ? 'Active' : 'Inactive',
                statusBool: role.is_active,
                noUsers: role.users_count,
                createdBy: `${role.created_by.first_name} ${role.created_by.last_name}`,
                createdAt: new Date(role.created_at),
                updatedAt: new Date(role.updated_at),
              };

              return newRole;
            })
          : [];

      setLoading(false);
      setRolesList(ROLES);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setRolesList([]);
    });
};

export const roleUpdateFetch = (fetchAPI, setRole, setLoading) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setRole({
        roleName: res.data.name ? res.data.name : '',
        roleDescription: res.data.description ? res.data.description : '',
      });
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};
