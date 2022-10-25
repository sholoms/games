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
        Console.WriteLine("Welcome to Minesweeper");
        Console.WriteLine("Options");
        Console.WriteLine(" -1: Play");
        Console.WriteLine(" -2: Quit");
        string choice;
        choice = Console.ReadLine();
        EvealuateChoice(choice);
        while (_programRunning)
        {
            Console.WriteLine("Options");
            Console.WriteLine(" -1: Play Again");
            Console.WriteLine(" -2: Quit");
            choice = Console.ReadLine();
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
                _programRunning = false;
                break;
        }

        ;
    }
}