import pygame

# to do :
# make it prettier 
# make the xs and os in the center of each cell 
# possibly add  to play it with the computer 
# make it restart 

white = (255,255,255)
black = (0,0,0)
red = (255,0,0)
blue = (0, 0,255) 
pink = (255, 193,203)

#Initializing game and window
pygame.init()
width = 300
height = 300 
window_size = (width, height)
sq_size = (width*height/9)**0.5
screen = pygame.display.set_mode(window_size)
pygame.display.set_caption("tic tac toe")

#Color of board and grid lines
screen.fill(white)
line_thickness = 4
lineclr = black 

#Draw the grid wow omg so totally unreal and def not what the function says
def draw_grid():
    for i in range (1,3):
        pygame.draw.line(screen, lineclr, (0, i*sq_size), (width, i*sq_size), line_thickness)
        pygame.draw.line(screen, lineclr, (i*sq_size, 0), (i*sq_size, height), line_thickness) 


#X's and O's 

x_clr = red
o_clr = blue 

font_size = 120 
font = pygame.font.SysFont('Arial', font_size)

#Empty board array 

board = [ [0]*3 for i in range(3)]

#When user clicks

def handle_mouse_click(pos, turn):
    row = pos[1] // 100
    col = pos[0] // 100
    if board[row][col] == 0:
        if turn == "X":
            board[row][col] = "X"
            text = font.render("X", True, x_clr)
            screen.blit(text, (col*100, row*100))
            return "O"
        else:
            board[row][col] = "O"
            text = font.render("O", True, o_clr)
            screen.blit(text, (col*100, row*100))
            return "X"
    return turn


#Check for the winner

def check_for_winner():
    #Check rows
    for row in range(3):
        if board[row][0] == board[row][1] == board[row][2] and board[row][0] != 0:
            return board[row][0]

    #Check columns 
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] != 0:
            return board[0][col] 
    
    #Check diagonals
    if board[0][0] == board[1][1]== board[2][2] and board[0][0] != 0:
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] != 0:
        return board[0][2]

    return None

def is_full():
    count = 0
    for i in range (3):
        for j in range (3):
            if board[i][j] != 0:
                count += 1
    if (count == 9):
        return 0
    else:
        return 1 


def end_game(winner):
    font_size = 60 
    font = pygame.font.SysFont(None, font_size)
    
    #Winner text
    text = font.render(f"{winner} wins!", True, (255,192,203))

    #TO DO: make it in the center 
    screen.blit(text, (width/2, height/2))

    pygame.display.update()

    
#Main game loop 
def main():
    global screen, turn, game, board;
    font_size = 30
    game = 0
    turn = "X"
    running = True
    while running:
        draw_grid()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                turn = handle_mouse_click(pygame.mouse.get_pos(), turn)
                is_full()
                #Marker to check if the game has ended- 0 if it hasn't, 1 if it has

                #Check for the winner
                winner = check_for_winner()
             
                if winner:
                    end_game(winner)
                    game = 1
                elif (is_full() == 0):
                    text = font.render("Tie!", True, (255, 192, 203))
                    screen.blit(text, (width/2, height/2))
                    pygame.display.update()
                    game = 1

                #if (game == 1):
                    #reset_function()

            pygame.display.update()
main()
