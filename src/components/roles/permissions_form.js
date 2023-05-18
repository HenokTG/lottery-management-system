import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

// @mui
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  tableCellClasses,
  TableRow,
  Box,
  FormControlLabel,
  Switch,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// modules
import { systemModulesFetch } from '../../_apiAxios/app-config';

// custom styles

const style = {
  position: 'absolute',
  top: '57%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  maxHeight: 570,
  height: 'auto',
  bgcolor: 'background.paper',
  border: 'none',
  overflow: 'auto',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '0em',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
    padding: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey['100'],
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

// render Data
const commandList = [
  {
    id: 1,
    key_word: 'can_create',
    header_title: 'Can Create',
  },
  {
    id: 2,
    key_word: 'can_view',
    header_title: 'Can View',
  },
  {
    id: 3,
    key_word: 'can_update',
    header_title: 'Can Update',
  },
  {
    id: 4,
    key_word: 'can_delete',
    header_title: 'Can Delete',
  },
  {
    id: 5,
    key_word: 'can_list',
    header_title: 'Can List',
  },
  {
    id: 6,
    key_word: 'can_enable',
    header_title: 'Can Enable',
  },
  {
    id: 7,
    key_word: 'can_disable',
    header_title: 'Can Disable',
  },
];

function PermissionsForm({ isPermissionOpen, permOpenFunc, setPermissionsObject }) {
  const [loading, setLoading] = useState(true);

  const [systemModulesList, setSystemModulesList] = useState([]);

  let tempPermissionsObject = {};
  let checkModuleChecked = [];
  let checkActionChecked = [];
  let checkModuleBoolArray = [];
  const [permissionsState, setPermissionsState] = useState({});

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isModuleChecked, setIsModuleChecked] = useState({});
  const [isActionChecked, setIsActionChecked] = useState({});

  const checkModuleFunc = (tempPermissionsObject) => {
    const rowObj = {};

    checkModuleChecked = systemModulesList.map((sysModule) => {
      rowObj[sysModule.name.toLowerCase()] = !Object.values(
        tempPermissionsObject[sysModule.name.toLowerCase()]
      ).includes(false);
      return 'rowObj';
    });

    return rowObj;
  };

  const checkActionFunc = (tempPermissionsObject) => {
    const columnObj = {};

    checkActionChecked = commandList.map((actionCom) => {
      const actionKey = actionCom.key_word;

      const columnArray = systemModulesList.map(
        (sysModule) => tempPermissionsObject[sysModule.name.toLowerCase()][actionKey]
      );

      columnObj[actionKey] = !columnArray.includes(false);

      return {};
    });

    return columnObj;
  };

  useEffect(
    () => {
      const fetchAPI = `module?page=${1}&per_page=${3}`;

      systemModulesFetch(fetchAPI, setLoading, setSystemModulesList, 'setPaginationProps');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      if (systemModulesList.length !== 0) {
        systemModulesList.map((sysModule) => {
          const moduleKey = sysModule.name.toLowerCase();

          tempPermissionsObject[moduleKey] = {};

          commandList.map((actionCom) => {
            const actionKey = actionCom.key_word;

            tempPermissionsObject[moduleKey][actionKey] = false;

            return 0;
          });

          return 0;
        });

        checkModuleBoolArray = systemModulesList.map(
          (sysModule) => !Object.values(tempPermissionsObject[sysModule.name.toLowerCase()]).includes(false)
        );

        setIsModuleChecked(checkModuleFunc(tempPermissionsObject));

        setIsActionChecked(checkActionFunc(tempPermissionsObject));

        setIsAllChecked(!checkModuleBoolArray.includes(false));

        setPermissionsState(tempPermissionsObject);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [systemModulesList]
  );

  const handleMarkSingle = (moduleName, comAction) => {
    const pervState = permissionsState[moduleName][comAction];

    tempPermissionsObject = JSON.parse(JSON.stringify(permissionsState));

    tempPermissionsObject[moduleName][comAction] = !pervState;

    const totalModule = systemModulesList.length;
    const totalAction = commandList.length;

    const checkedModules = systemModulesList
      .map((sysModule) => tempPermissionsObject[sysModule.name.toLowerCase()][comAction])
      .filter((elem) => elem === true);

    const checkedActions = commandList
      .map((cmdAction) => tempPermissionsObject[moduleName][cmdAction.key_word])
      .filter((elem) => elem === true);

    if (totalModule === checkedModules.length) {
      handleMarkAction(comAction);
    }

    if (totalAction === checkedActions.length) {
      handleMarkModule(moduleName);
    }

    // if (totalAction === checkedActions.length && totalModule === checkedModules.length) {
    //   handleMarkAll();
    //   console.log('All', totalModule * totalAction, checkedModules.length * checkedActions.length);
    // }

    setPermissionsState(tempPermissionsObject);
  };

  const handleMarkAll = () => {
    if (systemModulesList.length !== 0) {
      systemModulesList.map((sysModule) => {
        const moduleKey = sysModule.name.toLowerCase();

        tempPermissionsObject[moduleKey] = {};

        commandList.map((action) => {
          const actionKey = action.key_word;

          tempPermissionsObject[moduleKey][actionKey] = !isAllChecked;

          return 0;
        });

        return 0;
      });

      setIsModuleChecked(checkModuleFunc(tempPermissionsObject));

      setIsActionChecked(checkActionFunc(tempPermissionsObject));

      setIsAllChecked(!isAllChecked);

      setPermissionsState(tempPermissionsObject);
    }
  };

  const handleMarkModule = (moduleName) => {
    if (isModuleChecked[moduleName] !== undefined) {
      let tempModulePermissionsObject = {};
      tempPermissionsObject = JSON.parse(JSON.stringify(permissionsState));
      tempModulePermissionsObject = JSON.parse(JSON.stringify(isModuleChecked));

      commandList.map((action) => {
        const actionKey = action.key_word;

        tempPermissionsObject[moduleName][actionKey] = !isModuleChecked[moduleName];

        return 0;
      });

      tempModulePermissionsObject[moduleName] = !isModuleChecked[moduleName];

      setIsModuleChecked(tempModulePermissionsObject);
      setPermissionsState(tempPermissionsObject);
    }
  };

  const handleMarkAction = (comAction) => {
    if (isActionChecked[comAction] !== undefined) {
      let tempActionPermissionsObject = {};
      tempPermissionsObject = JSON.parse(JSON.stringify(permissionsState));
      tempActionPermissionsObject = JSON.parse(JSON.stringify(isActionChecked));

      systemModulesList.map((sysModule) => {
        const moduleKey = sysModule.name.toLowerCase();

        tempPermissionsObject[moduleKey][comAction] = !isActionChecked[comAction];

        return 0;
      });

      tempActionPermissionsObject[comAction] = !isActionChecked[comAction];

      setIsActionChecked(tempActionPermissionsObject);
      setPermissionsState(tempPermissionsObject);
    }
  };

  const handleSavePermissions = () => {
    setPermissionsObject(permissionsState);
    permOpenFunc(false);
  };

  return (
    <Modal
      open={isPermissionOpen}
      onClose={() => permOpenFunc(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <Fade in={isPermissionOpen}>
        <Card sx={style}>
          <Typography color='grey["900"]' variant="h5" sx={{ m: 3 }}>
            Set Permissions
          </Typography>
          <Box sx={{ m: 2, ml: 10, display: 'flex', justifyContent: 'flex-start' }}>
            <FormControlLabel
              control={
                <AntSwitch
                  checked={isAllChecked}
                  onChange={handleMarkAll}
                  inputProps={{ 'aria-label': 'mark all' }}
                  sx={{ mx: 1 }}
                />
              }
              label={`${isAllChecked ? 'Unmark' : 'Mark'} All`}
            />
            <Button
              color="secondary"
              size="small"
              variant="contained"
              sx={{ px: 5, ml: 5 }}
              onClick={handleSavePermissions}
            >
              Save
            </Button>
          </Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Card sx={{ m: 2 }}>
              <Table size="small">
                <TableHead sx={{ py: 2 }}>
                  <TableRow>
                    <StyledTableCell>Modules</StyledTableCell>
                    {commandList.map((comAction) => (
                      <StyledTableCell key={comAction.id} align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="inherit" sx={{ mb: 1 }}>
                            {comAction.header_title}
                          </Typography>
                          <AntSwitch
                            checked={
                              isActionChecked[comAction.key_word] !== undefined
                                ? isActionChecked[comAction.key_word]
                                : false
                            }
                            onChange={() => handleMarkAction(comAction.key_word)}
                            inputProps={{ 'aria-label': 'mark action for all modules' }}
                          />
                        </Box>
                      </StyledTableCell>
                    ))}
                    <StyledTableCell>Set for Module</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {systemModulesList.map((permModule) => (
                    <StyledTableRow hover key={permModule.id}>
                      <TableCell>{permModule.name}</TableCell>
                      {commandList.map((comAction) => (
                        <TableCell key={comAction.id} align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <AntSwitch
                              checked={
                                Object.keys(permissionsState).length !== 0
                                  ? permissionsState[permModule.name.toLowerCase()][comAction.key_word]
                                  : true
                              }
                              onChange={() => handleMarkSingle(permModule.name.toLowerCase(), comAction.key_word)}
                              inputProps={{ 'aria-label': 'mark action for single module' }}
                            />
                          </Box>
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <AntSwitch
                            checked={
                              isModuleChecked[permModule.name.toLowerCase()] !== undefined
                                ? isModuleChecked[permModule.name.toLowerCase()]
                                : false
                            }
                            onChange={() => handleMarkModule(permModule.name.toLowerCase())}
                            inputProps={{ 'aria-label': 'mark all actions for a module' }}
                          />
                        </Box>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
          <Box sx={{ m: 3, mr: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <FormControlLabel
              control={
                <AntSwitch
                  checked={isAllChecked}
                  onChange={handleMarkAll}
                  inputProps={{ 'aria-label': 'mark all' }}
                  sx={{ mx: 1 }}
                />
              }
              label={`${isAllChecked ? 'Unmark' : 'Mark'} All`}
            />
            <Button
              color="secondary"
              size="small"
              variant="contained"
              sx={{ px: 5, ml: 5 }}
              onClick={handleSavePermissions}
            >
              Save
            </Button>
          </Box>
        </Card>
      </Fade>
    </Modal>
  );
}

PermissionsForm.propTypes = {
  isPermissionOpen: PropTypes.bool,
  permOpenFunc: PropTypes.func,
  setPermissionsObject: PropTypes.func,
};

export default PermissionsForm;
