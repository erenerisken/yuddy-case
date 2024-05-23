import { SortCriteria } from '../interfaces/SortCriteria';
import { useTranslation } from 'react-i18next';
import { FormControl, MenuItem, Select } from '@mui/material';
import { sharedColors } from '../utils/Style';

interface SortCriteriaSelectProps {
  value: SortCriteria;
  onChange: (newValue: SortCriteria) => void;
}

const SortCriteriaSelect = (props: SortCriteriaSelectProps) => {
  const { t } = useTranslation();

  return (
    <FormControl
      size='small'
      fullWidth
      sx={{ backgroundColor: sharedColors.white }}
    >
      <Select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value as SortCriteria)}
        name='select'
        required
      >
        {Object.keys(SortCriteria).map((criteria) => (
          <MenuItem value={criteria} key={criteria}>
            {t(`category.sort_criteria.${criteria}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortCriteriaSelect;
