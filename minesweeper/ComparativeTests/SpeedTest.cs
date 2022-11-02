

using minesweeper.Components;

namespace minesweeper.ComparativeTests;

public static class SpeedTest
{
    public static void Run()
    {
        int iterativeTimes = 0;
        int recursiveTimes = 0;
        TimeSpan iteration = new TimeSpan();
        TimeSpan recursion = new TimeSpan();
        
        var coords = new[] {5, 5};
        for (var i = 0; i < 1000; i++)
        {
            var board = new Board(50, 50, 0);
            var start = DateTime.Now;
            board.PlayMoveIterative(coords);
            iteration += (DateTime.Now - start);
            iterativeTimes = board.times;
        }
        
        for (var i = 0; i < 1000; i++)
        {
            var board = new Board(50, 50, 0);
            var start = DateTime.Now;
            board.PlayMoveRecursive(coords);
            recursion += (DateTime.Now - start);
            recursiveTimes = board.times;
        }
        
        Console.WriteLine($"Iteration:");
        Console.WriteLine($"Total time: {iteration}");
        Console.WriteLine($"times: {iterativeTimes}");

        Console.WriteLine($"Recursion:");
        Console.WriteLine($"Total  time: {recursion}");
        Console.WriteLine($"times: {recursiveTimes}");
    }
}