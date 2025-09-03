using System.Drawing;
using System.Text;
using Photino.NET;

namespace HelloPhotinoApp
{
    //NOTE: To hide the console window, go to the project properties and change the Output Type to Windows Application.
    // Or edit the .csproj file and change the <OutputType> tag from "WinExe" to "Exe".
    internal class Program
    {
        [STAThread]
        static void Main(string[] args)
        {

            string datafile;

            datafile = "surah-table-arr.js"; // Replace with your URL
            Read(datafile);

            datafile = "quarter-hizb-page-arr.js"; // Replace with your URL
            Read(datafile);

            datafile = "page-time-arr.js"; // Replace with your URL
            Read(datafile);


            // Window title declared here for visibility
            string windowTitle = "Photino for QuranView .App";

            // Creating a new PhotinoWindow instance with the fluent API
            var window = new PhotinoWindow()
                .SetTitle(windowTitle)
                // Resize to a percentage of the main monitor work area
                .SetUseOsDefaultSize(false)
                .SetSize(new Size(1024, 800))
                // Center window in the middle of the screen
                .Center()
                // Users can resize windows by default.
                // Let's make this one fixed instead.
                .SetResizable(true)
                .Load("wwwroot/index.html"); // Can be used with relative path strings or "new URI()" instance to load a website.

            window.WaitForClose(); // Starts the application event loop
        }

        static async Task Read(string datafile)
        {
            string url = "https://nichpatr.com/Quran-Pages/data/" + datafile; // Replace with your URL

            // Path to save the new HTML file
            //string outputFilePath = @"C:\tmp\QuranView Data\" + datafile;
            string outputFilePath = @".\wwwroot\data\" + datafile;

            try
            {
                using HttpClient client = new HttpClient();
                string htmlContent = await client.GetStringAsync(url);

                //Console.WriteLine("HTML Content:");
                //Console.WriteLine(htmlContent);
                Console.WriteLine("HTML file read and saved successfully!");

                File.WriteAllText(outputFilePath, htmlContent);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }

        }

    }
}
