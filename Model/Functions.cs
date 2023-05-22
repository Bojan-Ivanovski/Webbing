using Newtonsoft.Json;


namespace Webbing.Model
{
    public class Functions
    {
        public static string outputFolder = "Accounts/";
        public static bool checkUser(string username) { return Directory.Exists(outputFolder + username); }
        public static bool checkChatExists(string username,string friend) { return File.Exists(outputFolder + username + "/" + friend + ".json"); }
        public static bool checkFriendChatExists(string username, string friend) { return File.Exists("Accounts/" + friend + "/" + username + ".json"); }
        public static bool checkUser(string username, string friendsName) { return Directory.Exists("Accounts/" + friendsName) && friendsName != username; }
        public static string Register(string username = "", string password = "", string email = "")
        {
            if (checkUser(username))
                return "User already exists";
            Directory.CreateDirectory(outputFolder + username);
            var file = File.Create(outputFolder + username + "/userData.json");
            file.Close();
            file = File.Create(outputFolder + username + "/friendsList.json");
            file.Close();
            UserData user = new UserData();
            user.id = Convert.ToInt32(Directory.GetDirectories("Accounts").Length);
            user.email = email;
            user.username = username;
            user.password = password;
            string jsonUser = JsonConvert.SerializeObject(user);
            File.WriteAllText(outputFolder + username + "/userData.json", jsonUser);
            File.WriteAllText(outputFolder + username + "/friendsList.json", "[]");
            return "User has been created";
        }
        public static string Login(string username = "", string password = "")
        {
            if (!checkUser(username))
                return "User does not exists";
            string userData = File.ReadAllText(outputFolder + username + "/userData.json");
            UserData? user = JsonConvert.DeserializeObject<UserData>(userData);
            if (username == user?.username && password == user?.password)
                return "Everythings ok - Redirecting";
            return "Credentials do not match";

        }
        public static List<string> GetFriends(string username)
        {
            #pragma warning disable CS8603
            List<string>? friends = new List<string>();
            friends = JsonConvert.DeserializeObject<List<string>>(File.ReadAllText(outputFolder + username + "/friendsList.json"));
            return friends;
            #pragma warning restore CS8603
        }
        public static string AddFriend(string username, string friendsName)
        {
            if (!checkUser(friendsName))
                return "User does not exist";
            List<string>? friends = JsonConvert.DeserializeObject<List<string>>(File.ReadAllText(outputFolder + username + "/friendsList.json"));
            #pragma warning disable CS8602
            foreach (string friend in friends)
                if (friend == friendsName)
                    return "Already a friend";
            #pragma warning restore CS8602
            friends?.Add(friendsName);
            File.WriteAllText(outputFolder + username + "/friendsList.json", JsonConvert.SerializeObject(friends));
            return "User Added";
        }
        public static string FriendAdd(string? userName, string friendsName)
        {
            List<string>? friends = JsonConvert.DeserializeObject<List<string>>(File.ReadAllText("Accounts/" + friendsName + "/friendsList.json"));
            #pragma warning disable CS8602
            foreach (string friend in friends)
                if (friend == userName)
                    return "Already a friend";
            #pragma warning restore CS8602
            #pragma warning disable CS8604
            friends?.Add(userName);
            #pragma warning restore CS8604
            File.WriteAllText("Accounts/" + friendsName + "/friendsList.json", JsonConvert.SerializeObject(friends));
            return "User Added";
        }

        public static string SaveMessage(string username, string friendsName, int author, string message)
        {
            Message newMessage = new Message(author, message);
            Message otherMessage = new Message(author + 1, message);
            List<Message>? UserWithFriend = new List<Message>();
            List<Message>? FriendWithUser = new List<Message>();
            if (checkChatExists(username, friendsName))
                UserWithFriend = JsonConvert.DeserializeObject<List<Message>>(File.ReadAllText(outputFolder + username + "/" + friendsName + ".json"));
            if (checkFriendChatExists(username, friendsName))
                FriendWithUser = JsonConvert.DeserializeObject<List<Message>>(File.ReadAllText("Accounts/" + friendsName + "/" + username + ".json"));
            UserWithFriend?.Add(newMessage);
            FriendWithUser?.Add(otherMessage);
            File.WriteAllText(outputFolder + username + "/" + friendsName + ".json", JsonConvert.SerializeObject(UserWithFriend));
            File.WriteAllText("Accounts/" + friendsName + "/" + username + ".json", JsonConvert.SerializeObject(FriendWithUser));
            FriendAdd(username, friendsName);
            return "Message sent";
        }

        public static List<Message> GetMessage(string username, string friendsName)
        {
            #pragma warning disable CS8603 
            List<Message>? Chat = new List<Message>();
            if (!checkChatExists(username, friendsName))
                return Chat;
            Chat = JsonConvert.DeserializeObject<List<Message>>(File.ReadAllText(outputFolder + username + "/" + friendsName + ".json"));
            return Chat;
            #pragma warning restore CS8603 
        }
    }
    public class UserData
    {
        public int id { get; set; }
        public string? username { get; set; }
        public string? password { get; set; }
        public string? email { get; set; }
    }
    public class Message
    {
        public int author { get; set; }
        public string? message { get; set; }

        public Message(int _author, string _message)
        {
            author = _author;
            message = _message;
        }
    }
}


