import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { ScaledSheet } from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';

// A custom modal component for date/time selection with Cancel and OK buttons.
const CustomPickerModal = ({ visible, mode, initialValue, onCancel, onOk }) => {
  const [tempValue, setTempValue] = useState(initialValue || new Date());

  useEffect(() => {
    setTempValue(initialValue || new Date());
  }, [initialValue]);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCancel}
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <DateTimePicker
          value={tempValue || new Date()}
          mode={mode}
          display="spinner"
          onChange={(event, selected) => {
            if (selected) setTempValue(selected);
          }}
        />
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => onOk(tempValue)}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function TravelTicketForm() {
  // Determine if data is provided and set dynamic labels accordingly.

  const { passedData } = useLocalSearchParams(); // Get data from URL params
  const { mode } = useLocalSearchParams(); // Get data from URL params
  console.log("🛠️ Passed Data:", passedData);
  console.log("🛠️ Mode:", mode);
  


  const data = passedData ? JSON.parse(passedData) : null; // Parse the string back to object
  console.log("🛠️ Data:", data);

  const isDataPassed = data !== null;
  
  const formTitle = isDataPassed ? "Confirm Details" : "Add Ticket";
  const submitButtonText = isDataPassed ? "Confirm" : "Submit Ticket";

  // Pre-fill form initial values using passed data if available.
  const initialFormValues = {
    pnr: data?.pnr || '',
    ticket_type: data?.ticket_type || '',
    from_location: data?.from_location || '',
    to_location: data?.to_location || '',
    from_date: data?.from_date ? new Date(data.from_date) : new Date(),
    to_date: data?.to_date ? new Date(data.to_date) : new Date(),
    from_time: data?.from_time || '',
    to_time: data?.to_time || '',
    passenger_details:
      data?.passenger_details && data.passenger_details.length > 0
        ? data.passenger_details
        : [{ name: '', age: '', gender: '', seat_number: '' }],
    type_specific: data?.type_specific || {},
  };

  // This state controls which picker modal is open
  const [pickerModal, setPickerModal] = useState({
    visible: false,
    field: '',
    mode: 'date',
  });

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    pnr: Yup.string().required('PNR is required'),
    ticket_type: Yup.string().required('Ticket type is required'),
    from_location: Yup.string().required('From location is required'),
    to_location: Yup.string().required('To location is required'),
    from_date: Yup.date().required('Travel from date is required'),
    to_date: Yup.date().required('Travel to date is required'),
    from_time: Yup.string().required('From time is required'),
    to_time: Yup.string().required('To time is required'),
    passenger_details: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Passenger name is required'),
        age: Yup.number()
          .positive('Age must be a positive number')
          .integer('Age must be an integer')
          .required('Age is required'),
        gender: Yup.string().required('Gender is required'),
        seat_number: Yup.string().required('Seat number is required'),
      })
    ),
  });

  // Ticket type options
  const TICKET_TYPES = [
    { label: 'Flight', value: 'flight' },
    { label: 'Train', value: 'train' },
    { label: 'Bus', value: 'bus' },
    { label: 'Ferry', value: 'ferry' },
  ];

  // Gender options
  const GENDER_OPTIONS = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  // Get ticket class options based on ticket type
  const getClassOptions = (ticket_type) => {
    const classOptions = {
      flight: [
        { label: 'Economy', value: 'economy' },
        { label: 'Business', value: 'business' },
        { label: 'First', value: 'first' },
      ],
      train: [
        { label: 'Sleeper', value: 'sleeper' },
        { label: 'AC', value: 'ac' },
        { label: 'General', value: 'general' },
      ],
      bus: [
        { label: 'Sleeper', value: 'sleeper' },
        { label: 'AC', value: 'ac' },
        { label: 'Non-AC', value: 'non-ac' },
      ],
    };
    return classOptions[ticket_type] || [];
  };

  // Render fields specific to the selected ticket type
  const renderTypeSpecificFields = (ticket_type, handleChange, values, setFieldValue) => {
    const typeFields = {
      flight: [
        { label: 'Flight Number', key: 'flight_number', placeholder: 'Enter Flight Number' },
        { label: 'Gate Number', key: 'gate_number', placeholder: 'Enter Gate Number' },
      ],
      train: [
        { label: 'Train Number', key: 'train_number', placeholder: 'Enter Train Number' },
        { label: 'Coach Number', key: 'coach_number', placeholder: 'Enter Coach Number' },
      ],
      bus: [{ label: 'Bus Number', key: 'bus_number', placeholder: 'Enter Bus Number' }],
      ferry: [
        { label: 'Ferry Name', key: 'ferry_name', placeholder: 'Enter Ferry Name' },
        { label: 'Deck Number', key: 'deck_number', placeholder: 'Enter Deck Number' },
      ],
    };

    if (!ticket_type) return null;

    return (
      <View style={styles.typeSpecificContainer}>
        <Text style={styles.sectionTitle}>
          {ticket_type.charAt(0).toUpperCase() + ticket_type.slice(1)} Details
        </Text>
        {typeFields[ticket_type]?.map((field, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              placeholder={field.placeholder}
              value={values.type_specific?.[ticket_type]?.[field.key] || ''}
              onChangeText={handleChange(`type_specific.${ticket_type}.${field.key}`)}
              style={styles.input}
            />
          </View>
        ))}
        {/* Dropdown for ticket class (for flight, train, bus) */}
        {['flight', 'train', 'bus'].includes(ticket_type) && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Class</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              inputSearchStyle={styles.dropdownInputSearch}
              data={getClassOptions(ticket_type)}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Class"
              searchPlaceholder="Search..."
              value={values.type_specific?.[ticket_type]?.class || null}
              onChange={item => setFieldValue(`type_specific.${ticket_type}.class`, item.value)}
            />
          </View>
        )}
      </View>
    );
  };

  // Opens the picker modal for a given field and mode (date or time)
  const openPicker = (field, mode) => {
    setPickerModal({ visible: true, field, mode });
  };
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
          <Icon
            name="arrow-back"
            type="ionicon"
            color="black"
            size={30}
            style={{paddingTop: 20}}
            onPress={() => router.back()}
          />
          <Text style={styles.formTitle}>{formTitle}</Text>
          <Text>       </Text>
        </View> 
        // TODO: just to make things centered
        // ! you cannot add a fucking comment without text tag
        // ! also you cannot add a tag in comments
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            // Add submission logic here
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
              {/* Ticket Type Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Ticket Type</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownSelectedText}
                  inputSearchStyle={styles.dropdownInputSearch}
                  data={TICKET_TYPES}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Ticket Type"
                  searchPlaceholder="Search..."
                  value={values.ticket_type || null}
                  onChange={item => {
                    setFieldValue('ticket_type', item.value);
                    // Reset type-specific details on ticket type change
                    setFieldValue('type_specific', {});
                  }}
                />
                {errors.ticket_type && touched.ticket_type && (
                  <Text style={styles.errorText}>{errors.ticket_type}</Text>
                )}
              </View>

              {/* Location Inputs */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>From Location</Text>
                <TextInput
                  value={values.from_location || ''}
                  onChangeText={handleChange('from_location')}
                  onBlur={handleBlur('from_location')}
                  style={styles.input}
                  placeholder="Enter From Location"
                />
                {errors.from_location && touched.from_location && (
                  <Text style={styles.errorText}>{errors.from_location}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>To Location</Text>
                <TextInput
                  value={values.to_location || ''}
                  onChangeText={handleChange('to_location')}
                  onBlur={handleBlur('to_location')}
                  style={styles.input}
                  placeholder="Enter To Location"
                />
                {errors.to_location && touched.to_location && (
                  <Text style={styles.errorText}>{errors.to_location}</Text>
                )}
              </View>

              {/* PNR Input Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>PNR</Text>
                <TextInput
                  value={values.pnr || ''}
                  onChangeText={handleChange('pnr')}
                  onBlur={handleBlur('pnr')}
                  style={styles.input}
                  placeholder="Enter PNR"
                />
                {errors.pnr && touched.pnr && (
                  <Text style={styles.errorText}>{errors.pnr}</Text>
                )}
              </View>

              {/* Date Pickers */}
              <View style={styles.dateTimeContainer}>
                <View style={styles.datePickerColumn}>
                  <Text style={styles.label}>From Date</Text>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => openPicker('from_date', 'date')}
                  >
                    <Text style={styles.dateButtonText}>
                      {values.from_date
                        ? new Date(values.from_date).toLocaleDateString()
                        : 'Select Date'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.datePickerColumn}>
                  <Text style={styles.label}>To Date</Text>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => openPicker('to_date', 'date')}
                  >
                    <Text style={styles.dateButtonText}>
                      {values.to_date
                        ? new Date(values.to_date).toLocaleDateString()
                        : 'Select Date'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Time Pickers */}
              <View style={styles.dateTimeContainer}>
                <View style={styles.datePickerColumn}>
                  <Text style={styles.label}>From Time</Text>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => openPicker('from_time', 'time')}
                  >
                    <Text style={styles.dateButtonText}>
                      {values.from_time || 'Select Time'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.datePickerColumn}>
                  <Text style={styles.label}>To Time</Text>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => openPicker('to_time', 'time')}
                  >
                    <Text style={styles.dateButtonText}>
                      {values.to_time || 'Select Time'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Render Picker Modal if active */}
              {pickerModal.visible && pickerModal.field !== '' && (
                <CustomPickerModal
                  visible={pickerModal.visible}
                  mode={pickerModal.mode}
                  initialValue={values[pickerModal.field] || new Date()}
                  onCancel={() => setPickerModal({ visible: false, field: '', mode: 'date' })}
                  onOk={(selected) => {
                    if (pickerModal.mode === 'time') {
                      // Format time as hh:mm
                      const formattedTime = new Date(selected).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                      setFieldValue(pickerModal.field, formattedTime);
                    } else {
                      setFieldValue(pickerModal.field, selected);
                    }
                    setPickerModal({ visible: false, field: '', mode: 'date' });
                  }}
                />
              )}

              {/* Passenger Details Section */}
              <FieldArray name="passenger_details">
                {({ push, remove, form }) => (
                  <View>
                    {form.values.passenger_details.map((passenger, index) => (
                      <View key={index} style={styles.passengerContainer}>
                        <Text style={styles.sectionTitle}>Passenger {index + 1}</Text>
                        <TextInput
                          autoCapitalize="words"
                          placeholder="Name"
                          value={passenger.name || ''}
                          onChangeText={handleChange(`passenger_details.${index}.name`)}
                          style={styles.input}
                        />
                        {form.errors.passenger_details &&
                          form.errors.passenger_details[index] &&
                          form.errors.passenger_details[index].name && (
                            <Text style={styles.errorText}>
                              {form.errors.passenger_details[index].name}
                            </Text>
                          )}
                        <TextInput
                          placeholder="Age"
                          value={
                            passenger.age !== undefined && passenger.age !== null
                              ? passenger.age.toString()
                              : ''
                          }
                          onChangeText={handleChange(`passenger_details.${index}.age`)}
                          keyboardType="numeric"
                          style={styles.input}
                        />
                        {form.errors.passenger_details &&
                          form.errors.passenger_details[index] &&
                          form.errors.passenger_details[index].age && (
                            <Text style={styles.errorText}>
                              {form.errors.passenger_details[index].age}
                            </Text>
                          )}
                        <Dropdown
                          style={styles.dropdown}
                          placeholderStyle={styles.dropdownPlaceholder}
                          selectedTextStyle={styles.dropdownSelectedText}
                          inputSearchStyle={styles.dropdownInputSearch}
                          data={GENDER_OPTIONS}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Gender"
                          value={passenger.gender || null}
                          onChange={item =>
                            setFieldValue(`passenger_details.${index}.gender`, item.value)
                          }
                        />
                        {form.errors.passenger_details &&
                          form.errors.passenger_details[index] &&
                          form.errors.passenger_details[index].gender && (
                            <Text style={styles.errorText}>
                              {form.errors.passenger_details[index].gender}
                            </Text>
                          )}
                        <TextInput
                          placeholder="Seat Number"
                          value={passenger.seat_number || ''}
                          onChangeText={handleChange(`passenger_details.${index}.seat_number`)}
                          style={styles.input}
                        />
                        {form.errors.passenger_details &&
                          form.errors.passenger_details[index] &&
                          form.errors.passenger_details[index].seat_number && (
                            <Text style={styles.errorText}>
                              {form.errors.passenger_details[index].seat_number}
                            </Text>
                          )}
                        {form.values.passenger_details.length > 1 && (
                          <TouchableOpacity
                            onPress={() => remove(index)}
                            style={styles.removePassengerButton}
                          >
                            <Text style={styles.removePassengerButtonText}>Remove Passenger</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                    <TouchableOpacity
                      style={styles.addPassengerButton}
                      onPress={() =>
                        push({ name: '', age: '', gender: '', seat_number: '' })
                      }
                    >
                      <Text style={styles.addPassengerButtonText}>+ Add Passenger</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </FieldArray>

              {/* Ticket Type Specific Fields */}
              {values.ticket_type &&
                renderTypeSpecificFields(
                  values.ticket_type,
                  handleChange,
                  values,
                  setFieldValue
                )}

              {/* Submit Button */}
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>{submitButtonText}</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '10@s',
  },
  scrollViewContent: {
    paddingBottom: '20@s',
  },
  formTitle: {
    marginTop: "20@s",
    fontSize: '20@s',
    fontWeight: 'bold',
    marginBottom: '15@s',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '10@s',
  },
  label: {
    marginBottom: '5@s',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    marginTop: "5@s",
    borderColor: '#ccc',
    padding: '10@s',
    borderRadius: '5@s',
  },
  dropdown: {
    borderWidth: 1,
    marginTop: "5@s",
    borderColor: '#ccc',
    borderRadius: '5@s',
    padding: '10@s',
  },
  dropdownPlaceholder: {
    color: '#999',
  },
  dropdownSelectedText: {
    fontSize: '16@s',
  },
  dropdownInputSearch: {
    height: '40@s',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: '15@s',
    borderRadius: '5@s',
    alignItems: 'center',
    marginTop: '15@s',
  },
  submitButtonText: {
    color: 'white',
    fontSize: '18@s',
  },
  errorText: {
    color: 'red',
    marginTop: '5@s',
  },
  typeSpecificContainer: {
    marginTop: '10@s',
  },
  sectionTitle: {
    fontSize: '18@s',
    fontWeight: 'bold',
    marginBottom: '10@s',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10@s',
  },
  datePickerColumn: {
    flex: 1,
    marginHorizontal: '5@s',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: '10@s',
    borderRadius: '5@s',
  },
  dateButtonText: {
    fontSize: '16@s',
    textAlign: 'center',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20@s',
    borderTopLeftRadius: '20@s',
    borderTopRightRadius: '20@s',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '10@s',
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: '10@s',
    borderRadius: '5@s',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: '5@s',
  },
  modalButtonText: {
    color: 'white',
    fontSize: '16@s',
  },
  passengerContainer: {
    marginBottom: '15@s',
    padding: '10@s',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: '5@s',
  },
  addPassengerButton: {
    backgroundColor: '#f0f0f0',
    padding: '10@s',
    borderRadius: '5@s',
    alignItems: 'center',
    marginBottom: '15@s',
  },
  addPassengerButtonText: {
    color: 'blue',
    fontSize: '16@s',
  },
  removePassengerButton: {
    backgroundColor: '#ffdddd',
    padding: '10@s',
    borderRadius: '5@s',
    alignItems: 'center',
    marginTop: '10@s',
  },
  removePassengerButtonText: {
    color: 'red',
    fontSize: '14@s',
  },
});
