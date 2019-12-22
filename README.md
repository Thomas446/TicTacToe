# TicTacToe
Tic Tac Toe with a modified minimax AI

To play, you must click one of the button options (e.g. play vs. AI or play vs. human). The board is disabled until you choose an option.

The minimax algorithm has slightly been modified so that if one side is guaranteed to lose, it tries to survive as long as possible (regular minimax would just have the losing side play random moves because all moves evaluate to a loss evantually)
Futhermore, it also incentivizes the winning player to win faster, when with the normal minimax, it would play random moves that don't lose its advantage, but don't necessarily win.
