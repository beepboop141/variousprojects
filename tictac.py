import pygame

# to do :
#make a starting screen 
# possibly add  to play it with the computer 

#Initializing game and window
pygame.init()
width = 300
height = 300 
window_size = (width, height)
sq_size = (width*height/9)**0.5
screen = pygame.display.set_mode(window_size)
pygame.display.set_caption("tic tac toe")

#Colors used 
white = (255,255,255)
black = (0,0,0)
red = (255,0,0)
blue = (0, 0,255) 
pink = (255, 193,203)

#Color of the board and the grid lines
screen.fill(white)
line_thickness = 4
lineclr = black 

#X's and O's and their colors/sizes
x_clr = red
o_clr = blue 
font_size = 120 
font = pygame.font.SysFont('Arial', font_size)

#Empty board array 
board = [[0]*3 for i in range(3)]

#Draw the grid wow omg so totally unreal and def not what the function says
def draw_grid():
    for i in range (1,3):
        pygame.draw.line(screen, lineclr, (0, i*sq_size), (width, i*sq_size), line_thickness)
        pygame.draw.line(screen, lineclr, (i*sq_size, 0), (i*sq_size, height), line_thickness) 

#When user clicks
def handle_mouse_click(pos, turn):
    row = pos[1] // 100
    col = pos[0] // 100
    if board[row][col] == 0:
        # Draw Xs on the board
        if turn == "X":
            board[row][col] = "X"
            text = font.render("X", True, x_clr)
            textRect = text.get_rect(center =(col*100 + 50, row*100 + 50))
            screen.blit(text, textRect)
            return "O"
        # Draw Os on th eboard
        elif turn == "O":
            board[row][col] = "O"
            text = font.render("O", True, o_clr)
            textRect = text.get_rect(center =(col*100 + 50, row*100 + 50))
            screen.blit(text, textRect)
            return "X"
        else:
            return 
    return turn

#Check for the winner
def check_for_winner():
    line_thickness = 8
    #Check rows
    for row in range(3):
        if board[row][0] == board[row][1] == board[row][2] and board[row][0] != 0:
            if board[row][0] == "X": 
                clr = x_clr
            else:
                clr = o_clr
            pygame.draw.line(screen, clr, (10, row*100 + (width/6)), (width-10, row*100 + (width/6)), line_thickness)
            return board[row][0]

    #Check columns 
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] != 0:
            if board[0][col] == "X": 
                clr = x_clr
            else:
                clr = o_clr
            pygame.draw.line(screen, clr, ((col*100)+(width/6), 10), ((col*100)+(width/6), height-10), line_thickness)
            return board[0][col] 
    
    #Check diagonals
    if board[0][0] == board[1][1]== board[2][2] and board[0][0] != 0:
        if board[0][0] == "X": 
            clr = x_clr
        else:
            clr = o_clr
        pygame.draw.line(screen, clr, (10, 10), (width-10, height-10), line_thickness)
        return board[0][0]
    
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] != 0:
        if board[0][2] == "X": 
            clr = x_clr
        else:
            clr = o_clr
        pygame.draw.line(screen, clr, (10, height-10), (width-10, 10), line_thickness)
        return board[0][2]

    return None

#Check if board is full
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

#End the game
def end_game(winner):
    global turn
    font_size = 60 
    font = pygame.font.SysFont(None, font_size)
    
    #Winner text
    if winner:
        text = font.render(f"{winner} wins!", True, black)
        turn = None
    elif is_full() == 0:
        text = font.render("Tie!", True, black)
    textRect = text.get_rect(center =(width/2, height/2))
    screen.blit(text, textRect)
    pygame.display.update()

#Reset the game
def reset():
    global board, winner, game, turn
    winner = None
    board = [[0]*3 for i in range(3)]
    game = 0
    turn = "X"
    screen.fill(white)
    draw_grid()
    pygame.display.update()
    return

#Main game loop 
def main():
    global screen, turn, game, board, winner
    game = 0
    turn = "X"
    running = True
    draw_grid()
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                turn = handle_mouse_click(pygame.mouse.get_pos(), turn)
                winner = check_for_winner()
                if winner or (is_full()==0):
                    end_game(winner)
                    game = 1
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_r and game == 1:
                    reset()
                elif event.key == pygame.K_q or event.key == pygame.K_ESCAPE:
                    pygame.quit()

            pygame.display.update()
main()
