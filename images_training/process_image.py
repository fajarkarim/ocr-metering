import cv2
import numpy as np

img = cv2.imread('16_cropped.jpg')
# gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
kernel = np.ones((5, 5), np.uint8)

threshold = cv2.threshold(img, 10, 255, cv2.THRESH_BINARY_INV)[1]
rectKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (9, 3))

# th3 = cv2.adaptiveThreshold(img,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,2)

gray2 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur2 = cv2.GaussianBlur(gray2, (5, 5), 0)
th2 = cv2.adaptiveThreshold(blur2, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)
th3 = cv2.adaptiveThreshold(blur2, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
# tophat = cv2.morphologyEx(blur2, cv2.MORPH_TOPHAT, rectKernel)
# morph_filtered = cv2.morphologyEx(th2, cv2.MORPH_CLOSE, kernel)
# contours = cv2.findContours(th2, 2, 1)
# print(contours)
# thresh2 = cv2.threshold(blur2, 170, 255, 0)[1]

# edged = cv2.Canny(morph_filtered, 50, 200, 255)

cv2.namedWindow('image', cv2.WINDOW_NORMAL)
# cv2.imshow('image',threshold)
cv2.imshow('image', th3)
k = cv2.waitKey(0)


if k == 27:
    cv2.destroyAllWindows()
elif k == 1048691:
    print('masukk')
    cv2.imwrite('output.jpeg', th2)
    cv2.destroyAllWindows()
