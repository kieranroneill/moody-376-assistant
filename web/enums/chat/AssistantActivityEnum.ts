// TODO: status pills shown while the assistant works through a request - move to server/database
enum AssistantActivityEnum {
  PowerCheck = 'power_check',
  ManualLookup = 'manual_lookup',
  ReviewLog = 'review_log',
  SystemCheck = 'system_check',
  Thinking = 'thinking',
  WeatherCheck = 'weather_check',
}

export default AssistantActivityEnum;
