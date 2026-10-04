import { StyleSheet } from 'react-native';

export const journalStyles = StyleSheet.create({
  form: {
    gap: 16,
  },
  heading: {
    gap: 8,
  },
  deleteButton: {
    backgroundColor: '#923D50',
  },
  fill: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: '#120239',
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#F2EFF7',
  },
  text: {
    color: '#F2EFF7',
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#E7E2EF',
    padding: 18,
    borderRadius: 16,
    gap: 10,
  },
  cardText: {
    color: '#120239',
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    color: '#120239',
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6D438D',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    minHeight: 48,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  input: {
    backgroundColor: '#E7E2EF',
    color: '#120239',
    padding: 14,
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
