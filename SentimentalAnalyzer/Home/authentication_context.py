def authentication_status(request):
    user_authenticated = request.user.is_authenticated
    return {'user_authenticated': user_authenticated}