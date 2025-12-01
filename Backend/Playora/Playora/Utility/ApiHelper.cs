namespace Playora.Utility
{
    public class ApiHelper<T>
    {
        public ApiHelper(T data, string errorMessage, bool status)
        {
            this.data = data;
            this.errorMessage = errorMessage;
            Status = status;
        }

        public T data { get; set; }
        public string errorMessage { get; set; }
        public bool Status {  get; set; }

      
        public static ApiHelper<T> Error(string message)
        {
            return new ApiHelper<T>(default, message, false);
        }

        public static ApiHelper<T> Success (T data,string message)
        {
            return new ApiHelper<T>(data, message, true);
        }
    }
}
