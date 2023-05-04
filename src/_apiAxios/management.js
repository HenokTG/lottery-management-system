import { axiosInstance } from '../utils/axios';

export const fetchUsers = (fetchAPI, setLoading, setUsersList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const USERS = res.data.data.map((user) => {
        return {
          id: user.id,
          userName: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phoneNumber: user.phone,
          role: user.role.name,
          status: user.is_active ? 'Active' : 'Inactive',
          createdBy: user.created_by,
          createdAt: new Date(user.created_at),
        };
      });

      setLoading(false);
      setUsersList(USERS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setUsersList([]);
    });
};

export const fetchRoles = (fetchAPI, setLoading, setRolesList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const ROLES = res.data.data.map((role) => {
        return {
          id: role.id,
          role: role.name,
          description: role.description,
          get permission() {
            let action = '';
            if (
              role.permissions.module.can_view &&
              role.permissions.module.can_update &&
              role.permissions.module.can_create
            ) {
              action = 'Is Admin User';
            } else if (
              role.permissions.module.can_view &&
              role.permissions.module.can_create &&
              !role.permissions.module.can_update
            ) {
              action = 'Can View & Create';
            } else if (
              role.permissions.module.can_view &&
              role.permissions.module.can_update &&
              !role.permissions.module.can_create
            ) {
              action = 'Can View & Modify';
            } else if (
              role.permissions.module.can_view &&
              !role.permissions.module.can_create &&
              !role.permissions.module.can_update
            ) {
              action = 'View Only';
            } else {
              action = 'No Permission';
            }

            return action;
          },
          status: role.is_active ? 'Active' : 'Inactive',
          noUsers: role.no_users,
          createdAt: new Date(role.created_at),
          updatedAt: new Date(role.updated_at),
        };
      });

      setLoading(false);
      setRolesList(ROLES);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setRolesList([]);
    });
};
