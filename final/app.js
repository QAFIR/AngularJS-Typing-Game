angular.module('SpeedTyperApp', [])
.controller('SpeedTyperController', function($scope, $interval, $window) {
    $scope.word = '';
    $scope.text = '';
    $scope.score = 0;
    $scope.time = 10;
    $scope.endgameVisible = false;
    $scope.settingsVisible = false;
    $scope.difficulty = 'medium';

    const words = [
        'sigh', 'tense', 'airplane', 'ball', 'pies', 'juice', 'warlike', 'bad', 'north', 'dependent', 'steer', 'silver', 'highfalutin', 'superficial', 'quince', 'eight', 'feeble', 'admit', 'drag', 'loving'
    ];

    let timeInterval;

    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    function addWordToScope() {
        $scope.word = getRandomWord();
    }

    function updateScore() {
        $scope.score++;
    }

    function updateTime() {
        $scope.time--;
        if ($scope.time === 0) {
            $interval.cancel(timeInterval);
            $scope.endgameVisible = true;
        }
    }

    $scope.startGame = function() {
        addWordToScope();
        timeInterval = $interval(updateTime, 1000);
    };

    $scope.checkWord = function() {
        if ($scope.text === $scope.word) {
            addWordToScope();
            updateScore();
            $scope.text = '';

            if ($scope.difficulty === 'hard') {
                $scope.time += 2;
            } else if ($scope.difficulty === 'medium') {
                $scope.time += 3;
            } else {
                $scope.time += 5;
            }
        }
    };

    $scope.resetGame = function() {
        $scope.score = 0;
        $scope.time = 10;
        $scope.text = '';
        $scope.endgameVisible = false;
    };

    $scope.toggleSettings = function() {
        $scope.settingsVisible = !$scope.settingsVisible;
    };

    $scope.saveDifficulty = function() {
        $window.localStorage.setItem('difficulty', $scope.difficulty);
    };

    // Initialize difficulty from local storage
    const storedDifficulty = $window.localStorage.getItem('difficulty');
    if (storedDifficulty) {
        $scope.difficulty = storedDifficulty;
    }

    // Focus on text input on start
    angular.element(document).ready(function () {
        angular.element('#text').focus();
    });

    // Start the game
    $scope.startGame();
});
