import { axiosInstance } from '../utils/axios';

export const fetchUsers = (fetchAPI, setLoading, setUsersList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const USERS =
        res.data.data !== undefined
          ? res.data.data.map((user) => {
              const newUser = {
                id: user.id,
                userName: `${user.first_name} ${user.last_name}`,
                email: user.email,
                phoneNumber: user.phone,
                role: user.role,
                status: user.is_active ? 'Active' : 'Inactive',
                createdBy: `${user.created_by.first_name} ${user.created_by.last_name}`,
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

export const userUpdateFetch = (fetchAPI, setUser) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) =>
      setUser({
        firstName: res.data.first_name ? res.data.first_name : '',
        lastName: res.data.last_name ? res.data.last_name : '',
        email: res.data.email ? res.data.email : '',
        phoneNumber: res.data.phone ? res.data.phone : '',
        userRole: res.data.role ? res.data.role.id : '',
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const fetchRoles = (fetchAPI, setLoading, setRolesList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const ROLES =
        res.data.data !== undefined
          ? res.data.data.map((role) => {
              const newRole = {
                id: role.id,
                role: role.name,
                description: role.description,
                status: role.is_active ? 'Active' : 'Inactive',
                noUsers: role.no_users,
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

export const roleUpdateFetch = (fetchAPI, setRole) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) =>
      setRole({
        roleName: res.data.name ? res.data.name : '',
        roleDescription: res.data.description ? res.data.description : '',
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
