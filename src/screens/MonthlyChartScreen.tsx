import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import MonthChart from '../components/ui/MonthChart';
import {useTheme} from '../context/ThemeContext';
import {THEME_COLORS} from '../constants/ThemeColors';
import CustomDropdown from '../components/ui/CustomDropdown';
import useApi from '../hooks/useApi';
import {API_ENDPOINTS} from '../constants/ApiEndPoints';
import { monthData } from '../constants/enum';

const MonthlyChartScreen = () => {
  const {theme} = useTheme();
  const colors = THEME_COLORS[theme];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('');
  const {sendData} = useApi(API_ENDPOINTS.GET_SINGLE_DATA);

  const dropdownOptions = [
    { key: 'A', value: 'A' },
    { key: 'B', value: 'B' },
    { key: 'C', value: 'C' },
  ];

  useEffect(() => {
    setSelectedOption('A');
    const formattedMonth = formatYearMonth(currentMonth);
    // sendData(API_ENDPOINTS.GET_SINGLE_DATA, { date: formattedMonth }, false);
  }, []);

  const formatYearMonth = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  };

  const handleOptionSelect = (key: string, value: string) => {
    setSelectedOption(key);
    const newDate = new Date();
    
    if (key === 'A') {
      newDate.setMonth(0);
    } else if (key === 'B') {
      newDate.setMonth(4);
    } else if (key === 'C') {
      newDate.setMonth(8);
    }
    setCurrentMonth(newDate);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <CustomDropdown
          data={dropdownOptions}
          placeholder="Select option"
          label="Choose option"
          onSelect={handleOptionSelect}
          selectedKey={selectedOption}
          style={styles.dropdown}
        />
        
        <View style={styles.chartContainer}>
          <MonthChart month={currentMonth} className="w-full" data={monthData} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
  dropdown: {
    marginBottom: 8,
  },
  headerBox: {
    padding: 16,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
  },
  chartContainer: {
    flex: 1,
  },
  legendBox: {
    padding: 12,
    borderRadius: 8,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 8,
  },
  colorBox: {
    width: 16,
    height: 16,
    marginRight: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default MonthlyChartScreen;


