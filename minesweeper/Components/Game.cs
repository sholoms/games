using System.Text.RegularExpressions;
using minesweeper.Exceptions;

namespace minesweeper.Components;

public class Game
{
    private Board? _board;
    public void Play()
    {
        var height = Int32.Parse(GetInt("Height of the board"));
        int width = Int32.Parse(GetInt("Width of the board"));
        int mines = Int32.Parse(GetInt("Number of mines"));
        _board = new Board(height, width, mines);
        string gameState = Constants.GameState.InProgress;
        DisplayBoard();
        while (gameState == Constants.GameState.InProgress)
        {
            var nextMove = GetMove();
            try
            {
                gameState = _board.PlayMove(nextMove.ToArray());
                DisplayBoard();
            }
            catch (InvalidMoveException)
            {
                Console.WriteLine("Invalid move");
            }
        }

        var endGameMessage = gameState == Constants.GameState.Won ? "Congratulations! You WON!" : "You Lost. Better luck next game!";
        Console.WriteLine(endGameMessage);
    }

    private string GetInt(string message)
    {
        Console.WriteLine(message);
        string response = Console.ReadLine();
        if (!ValidInput(response, Constants.ValidIntRegex))
        {
            Console.WriteLine("InValid input");
            response = GetInt(message);
        }

        return response;
    }

    private IEnumerable<int> GetMove()
    {
        string move = AskForMove();
        

        string[] coords = move.Split(",");
        var moveCoords = coords.Select(x=>Int32.Parse(x));
        return moveCoords;
    }

    private string AskForMove()
    {
        Console.Write("Next Move: ");
        string move = Console.ReadLine();
        if (!ValidInput(move, Constants.ValidMoveRegex))
        {
            move = AskForMove();
        }

        return move;
    }

    private bool ValidInput(string move, Regex pattern)
    {
        return pattern.Match(move).Success;
    }

    private void DisplayBoard()
    {
        Console.WriteLine(_board?.ToString());
    }
}