using System.Text.RegularExpressions;
using System.Xml;

namespace minesweeper;

public class Constants
{
    public class GameState
    {
        public const string Lost = "Lost";
        public const string Won = "Won";
        public const string InProgress = "in progress";
    }

    public static readonly Regex ValidMoveRegex = new("[0-9]+,[0-9]+");
    public static readonly Regex ValidIntRegex = new("[0-9]+");
}