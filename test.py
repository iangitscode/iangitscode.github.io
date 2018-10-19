def every_other(s):
    """Returns a string that contains every other character from s, in
    order, beginning with the character at index 0.
    
    Args:
        s: a str

    Some examples:
    >>> every_other('')
    ''
    >>> every_other('x')
    'x'
    >>> every_other('csca20')
    'cc2'
    >>> every_other('csc a20')
    'cca0'
    """
    result = ''
    for i in range((len(s) + 1)//2):
        result = result + s[2 * i]
    return result


print(every_other("sflksjf lskdfj sdflksj fdl34e"))
print(every_other("x"))
print(every_other("deagba"))
print(every_other("abc"))
