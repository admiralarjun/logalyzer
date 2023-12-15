import PropTypes from 'prop-types';
import { SvgIcon } from '@mui/material';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon'

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const ThreatsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Threat Name
                </TableCell>
                <TableCell>
                  Threat Description
                </TableCell>
                <TableCell>
                  Threat Pattern
                </TableCell>
                <TableCell>
                  Threat Score
                </TableCell>
                <TableCell>
                  Reference
                </TableCell>
                <TableCell>
                  Playbook
                </TableCell>
                {/* Add more columns as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((threat) => {
                const isSelected = selected.includes(threat.id);

                return (
                  <TableRow
                    hover
                    key={threat.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(threat.id);
                          } else {
                            onDeselectOne?.(threat.id);
                          }
                        }}
                      />
                    </TableCell>
<<<<<<< HEAD
                    <TableCell>{threat.name}</TableCell>
                    <TableCell>{threat.description}</TableCell>
                    <TableCell>{threat.signature}</TableCell>
                    <TableCell>{threat.score}</TableCell>
                    <TableCell>{threat.ref_links}</TableCell>
                    <TableCell>
                      {threat.playbooks}
                    </TableCell>
=======
                    <TableCell>
                      {threat.name}
                    </TableCell>
                    <TableCell>
                      {threat.description}
                    </TableCell>
                    <TableCell>
                      {threat.pattern}
                    </TableCell>
                    <TableCell>
                      {threat.score}
                    </TableCell>
                    {/* Add more cells as needed */}
>>>>>>> 6aff6a028cbcad61c83c5f4198a4c9b56a8dae85
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ThreatsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
