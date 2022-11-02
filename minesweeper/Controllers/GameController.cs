using minesweeper.ComparativeTests;
using minesweeper.Components;

namespace minesweeper.Controllers;

public class GameController
{
    private readonly Game _game;
    private bool _programRunning;

    public GameController()
    {
        _game = new Game();
        _programRunning = true;
    }

    public void Run()
    {
        while (_programRunning)
        {
            Console.WriteLine("Welcome to Minesweeper");
            Console.WriteLine("");
            Console.WriteLine("Options");
            Console.WriteLine(" -1: Play");
            Console.WriteLine(" -2: Stats");
            Console.WriteLine(" -9: Quit");
            var choice = Console.ReadLine();
            EvealuateChoice(choice);
        }
    }

    private void EvealuateChoice(string choice)
    {
        switch (choice)
        {
            case "1":
                _game.Play();
                break;
            case "2":
                _game.Stats();
                break;
            case "3":
                SpeedTest.Run();
                break;
            case "9":
                _programRunning = false;
                break;
            default:
                Console.WriteLine("Invalid input");
                break;
        }
    }
}