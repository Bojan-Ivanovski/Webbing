using Webbing.Model;
using Microsoft.AspNetCore.Mvc;

namespace Webbing.Controllers
{
    public class RegisterController : Controller
    {

        [Route("register/{name?}/{pass?}/{email?}")]
        public IEnumerable<string> Register(string name = "", string pass = "", string email = "")
        {
            List<string> strings = new List<string>() { Functions.Register(name, pass, email) };
            return strings.ToArray();
        }

        [Route("login/{name?}/{pass?}")]
        public IEnumerable<string> Login(string name = "", string pass = "")
        {
            List<string> strings = new List<string>() { Functions.Login(name, pass) };
            return strings.ToArray();
        }


        [Route("chat-get/{username?}/{friendsUsername?}")]
        public IEnumerable<Message> GetChat(string username = "", string friendsUsername = "")
        {
            List<Message> messages = Functions.GetMessage(username, friendsUsername);
            return messages.ToArray();
        }


        [Route("getfriends/{username?}")]
        public IEnumerable<string> GetFriends(string username = "")
        {
            List<string> strings = Functions.GetFriends(username);
            return strings.ToArray();
        }


        [Route("chat-save/{username?}/{friendsName?}/{message?}")]
        public IEnumerable<string> SaveMessage(string username="", string friendsName = "", string message = "")
        {
            int author = 1;
            List<string> strings = new List<string> { Functions.SaveMessage(username, friendsName, author, message) };
            return strings.ToArray();
        }

        [Route("addfriends/{username?}/{friendsName?}")]
        public IEnumerable<string> AddFriend(string username = "", string friendsName = "")
        {
            List<string> strings = new List<string> { Functions.AddFriend(username, friendsName) };
            return strings.ToArray();
        }

    }


}
