a, y, b0, b1 = 3, 5, 1, -1

def rec(n):
    if n == 1:
        return a
    if n & 1:
        t = (n - 1) // 2
        return 3 * rec(t) + t * y + b1
    t = n // 2
    return 3 * rec(t) + t * y + b0

print(rec(56))