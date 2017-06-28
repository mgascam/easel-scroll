/*
 ///////////////////////////////////////////////////////////////////////////
 Module:
 Created Date: 09/06/2017
 Author: mgasca
 Description

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2017 - The Workshop  All rights reserved.
 //////////////////////////////////////////////////////////////////////////////
 */
var GameHistoryView = (function(){
  return function(config) {
    var obj = {};
    var viewContainer = new createjs.Container();
    viewContainer.name = 'game-history-view';
    var headerContainer = new createjs.Container();
    headerContainer.name = 'game-history-view-header';
    var currentRoundContainer = new createjs.Container();
    currentRoundContainer.name = 'game-history-view-current-round';
    var historyContainer = new createjs.Container();
    historyContainer.name = 'game-history-view-history';
    var settings = config.getGameHistory();
    var header = {};
    var currentRound = {};
    var roundHistory = [];

    var containers = {
      'landscape': '',
      'portrait': '',
      'desktop': ''
    };

    obj.init = function(p) {
      viewContainer.visible = true;
      containers.landscape = p.landscapeContainer;
      containers.portrait = p.portraitContainer;
      containers.desktop = p.desktopContainer;
      createTableHeader();
      createCurrentRound();

      viewContainer.addChild(headerContainer);
      viewContainer.addChild(currentRoundContainer);
      viewContainer.addChild(historyContainer);

      containers[config.getOrientation()].addChild(viewContainer);
      draw();
    };

    obj.changeOrientation = function() {
      containers.landscape.removeChild(viewContainer);
      containers.portrait.removeChild(viewContainer);
      containers[config.getOrientation()].addChild(viewContainer);
      draw();
    };

    obj.show = function() {
      viewContainer.visible = true;
      return $.when();
    };
    obj.setCurrentRoundIndex = function(roundIndex) {
      currentRound.roundLabel.text = roundIndex;
    };
    obj.setCurrentRoundHits = function(hits) {
      currentRound.hitsLabel.text = (hits === 0 ? '-' : hits);
    };
    obj.setCurrentRoundStar = function() {
      currentRound.winLabel.text = config.getIconCharacter('star');
    };
    obj.addRoundToHistory = function(round) {
      addRoundToHistory(round);
      draw();
      return $.when();
    };

    function createTableHeader() {
      var round = settings.header.round;
      header.roundLabel = new createjs.Text();
      header.roundLabel.text = config.getLabel('game-history-round');
      header.roundLabel.font = round.style.font;
      header.roundLabel.color = round.style.color;
      header.roundLabel.alpha = round.style.opacity;

      var hits = settings.header.hits;
      header.hitsLabel = new createjs.Text();
      header.hitsLabel.text = config.getLabel('game-history-hits');
      header.hitsLabel.font = hits.style.font;
      header.hitsLabel.color = hits.style.color;
      header.hitsLabel.alpha = hits.style.opacity;

      var win = settings.header.win;
      header.winLabel = new createjs.Text();
      header.winLabel.text = config.getLabel('game-history-win');
      header.winLabel.font = win.style.font;
      header.winLabel.color = win.style.color;
      header.winLabel.alpha = win.style.opacity;

      var separator = settings.header.separator;
      header.separator = new createjs.Shape();
      header.separator.graphics
        .beginFill(separator.style.color)
        .drawRect(0, 0, separator.style.width, separator.style.height);

      headerContainer.addChild(header.roundLabel);
      headerContainer.addChild(header.hitsLabel);
      headerContainer.addChild(header.winLabel);
      headerContainer.addChild(header.separator);
    }
    function createCurrentRound() {
      var round = settings.currentRound.round;
      currentRound.roundLabel = new createjs.Text();
      currentRound.roundLabel.font = round.style.font;
      currentRound.roundLabel.color = round.style.color;
      currentRound.roundLabel.alpha = round.style.opacity;
      currentRound.roundLabel.textAlign = 'center';

      var hits = settings.currentRound.hits;
      currentRound.hitsLabel = new createjs.Text();
      currentRound.hitsLabel.font = hits.style.font;
      currentRound.hitsLabel.color = hits.style.color;
      currentRound.hitsLabel.alpha = hits.style.opacity;
      currentRound.hitsLabel.textAlign = 'center';

      var win = settings.currentRound.win;
      currentRound.winLabel = new createjs.Text();
      currentRound.winLabel.text = '-';
      currentRound.winLabel.textAlign = 'center';
      currentRound.winLabel.font = win.style.font;
      currentRound.winLabel.color = win.style.color;
      currentRound.winLabel.alpha = win.style.opacity;

      var bkg = settings.currentRound.background;
      currentRound.background = new createjs.Shape();
      currentRound.background.alpha = bkg.style.opacity;

      currentRoundContainer.addChild(currentRound.roundLabel);
      currentRoundContainer.addChild(currentRound.hitsLabel);
      currentRoundContainer.addChild(currentRound.winLabel);
      currentRoundContainer.addChild(currentRound.background);
    }
    function formatWinAmount(amount) {
      return config.getCurrencySymbol() + config.formatWinAmount(amount / 100, 0);
    }
    function addRoundToHistory(params) {
      var newRound = {};
      var isWinningRound = params.outcome > 0;
      newRound.container = new createjs.Container();
      newRound.type = isWinningRound ? 'win' : 'lose';

      var round = settings.roundHistory.round;
      newRound.roundLabel = new createjs.Text();
      newRound.roundLabel.text = params.index;
      newRound.roundLabel.font = round.style.font;
      newRound.roundLabel.color = round.style.color;
      newRound.roundLabel.alpha = round.style.opacity;
      newRound.roundLabel.textAlign = 'center';

      var hits = settings.roundHistory.hits;
      newRound.hitsLabel = new createjs.Text();
      newRound.hitsLabel.text = params.hits;
      newRound.hitsLabel.font = hits.style.font;
      newRound.hitsLabel.color = hits.style.color;
      newRound.hitsLabel.alpha = hits.style.opacity;
      newRound.hitsLabel.textAlign = 'center';

      newRound.winContainer = new createjs.Container();

      if (isWinningRound) {
        newRound.winBackground = new createjs.Shape();
        newRound.winContainer.addChild(newRound.winBackground);
      }

      var win = settings.roundHistory.win;
      newRound.winLabel = new createjs.Text();
      newRound.winLabel.text = isWinningRound ? formatWinAmount(params.outcome) : '-';
      newRound.winLabel.font = win.style.font;
      newRound.winLabel.color = config.getTheme().foreground;
      newRound.winLabel.alpha = win.style.opacity;
      newRound.winLabel.textAlign = 'center';
      newRound.winContainer.addChild(newRound.winLabel);

      newRound.separator = new createjs.Shape();

      newRound.container.addChild(newRound.roundLabel);
      newRound.container.addChild(newRound.hitsLabel);
      newRound.container.addChild(newRound.winContainer);
      newRound.container.addChild(newRound.separator);
      roundHistory.unshift(newRound);
      historyContainer.addChild(newRound.container);
      return $.when();
    }
    function draw() {
      viewContainer.x = settings.layout[config.getOrientation()].x;
      viewContainer.y = settings.layout[config.getOrientation()].y;
      headerContainer.x = settings.header.layout[config.getOrientation()].x;
      headerContainer.y = settings.header.layout[config.getOrientation()].y;
      currentRoundContainer.x = settings.currentRound.layout[config.getOrientation()].x;
      currentRoundContainer.y = settings.currentRound.layout[config.getOrientation()].y;
      historyContainer.x = settings.roundHistory.layout[config.getOrientation()].x;
      historyContainer.y = settings.roundHistory.layout[config.getOrientation()].y;

      drawTableHeader();
      drawCurrentRound();
      drawHistory();
      viewContainer.scaleX = viewContainer.scaleY = settings.layout[config.getOrientation()].scale;
    }
    function drawTableHeader() {
      header.roundLabel.x = settings.header.round.layout[config.getOrientation()].x;
      header.roundLabel.y = settings.header.round.layout[config.getOrientation()].y;

      header.hitsLabel.x = settings.header.hits.layout[config.getOrientation()].x;
      header.hitsLabel.y = settings.header.hits.layout[config.getOrientation()].y;

      header.winLabel.x = settings.header.win.layout[config.getOrientation()].x;
      header.winLabel.y = settings.header.win.layout[config.getOrientation()].y;
      header.winLabel.visible = settings.header.win.layout[config.getOrientation()].visible;

      header.separator.x = settings.header.separator.layout[config.getOrientation()].x;
      header.separator.y = settings.header.separator.layout[config.getOrientation()].y;
      header.separator.visible = settings.header.separator.layout[config.getOrientation()].visible;
    }
    function drawCurrentRound() {
      currentRound.roundLabel.x = settings.currentRound.round.layout[config.getOrientation()].x;
      currentRound.roundLabel.y = settings.currentRound.round.layout[config.getOrientation()].y;

      currentRound.hitsLabel.x = settings.currentRound.hits.layout[config.getOrientation()].x;
      currentRound.hitsLabel.y = settings.currentRound.hits.layout[config.getOrientation()].y;

      currentRound.winLabel.x = settings.currentRound.win.layout[config.getOrientation()].x;
      currentRound.winLabel.y = settings.currentRound.win.layout[config.getOrientation()].y;

      currentRound.background.x = settings.currentRound.background.layout[config.getOrientation()].x;
      currentRound.background.y = settings.currentRound.background.layout[config.getOrientation()].y;
      currentRound.background.graphics.clear();

      var roundRect = new createjs.Graphics.RoundRect(0, 0, settings.currentRound.background.layout[config.getOrientation()].width, settings.currentRound.background.layout[config.getOrientation()].height, settings.currentRound.background.layout[config.getOrientation()].radius, settings.currentRound.background.layout[config.getOrientation()].radius, settings.currentRound.background.layout[config.getOrientation()].radius, settings.currentRound.background.layout[config.getOrientation()].radius);
      currentRound.background.graphics.append(roundRect);

      var fill = new createjs.Graphics.Fill(settings.currentRound.background.style.color);
      currentRound.background.graphics.append(fill);
    }
    function drawHistory() {
      console.log(roundHistory);
      roundHistory.forEach(function(round, index) {
        var roundPosition = getRoundPosition(index);
        round.container.x = roundPosition.x;
        round.container.y = roundPosition.y;
        var isWinningRound = round.type === 'win';
        var winLabelBounds = {};
        winLabelBounds.width = round.winLabel.text.length * settings.roundHistory.win.style.fontSize;
        //TODO put this to config
        winLabelBounds.height = 20;
        if (isWinningRound) {
          var rect = new createjs.Graphics.RoundRect(
            0,
            0,
            winLabelBounds.width + settings.roundHistory.winBackground.layout[config.getOrientation()].padding[round.type].x,
            winLabelBounds.height + settings.roundHistory.winBackground.layout[config.getOrientation()].padding[round.type].y,
            settings.roundHistory.winBackground.layout[config.getOrientation()].radius,
            settings.roundHistory.winBackground.layout[config.getOrientation()].radius,
            settings.roundHistory.winBackground.layout[config.getOrientation()].radius,
            settings.roundHistory.winBackground.layout[config.getOrientation()].radius
          );
          round.winBackground.graphics.append(rect);
          var fill = new createjs.Graphics.Fill(settings.roundHistory.winBackground.style.fill);
          round.winBackground.graphics.append(fill);
        }
        var columnWidth = winLabelBounds.width + settings.roundHistory.winBackground.layout[config.getOrientation()].padding[round.type].x;
        var columnHeight = isWinningRound ? 20 : 20;

        round.winLabel.x = columnWidth / 2;

        var hitLabelPosition = getHistoryLabelPosition('hits', index, columnWidth, columnHeight, round.type);
        round.hitsLabel.x = hitLabelPosition.x;
        round.hitsLabel.y = hitLabelPosition.y;

        var roundLabelPosition = getHistoryLabelPosition('round', index, columnWidth, columnHeight, round.type);
        round.roundLabel.x = roundLabelPosition.x;
        round.roundLabel.y = roundLabelPosition.y;

        var winContainerPosition = getHistoryWinContainerPosition(columnWidth);
        round.winContainer.x = winContainerPosition.x;
        round.winContainer.y = winContainerPosition.y;

        round.separator.graphics.clear();
        var separatorRect = new createjs.Graphics.Rect(0, 0, settings.roundHistory.separator.layout[config.getOrientation()].width, settings.roundHistory.separator.layout[config.getOrientation()].height);
        round.separator.graphics.append(separatorRect);

        var separatorFill = new createjs.Graphics.Fill(settings.roundHistory.separator.style.color);
        round.separator.graphics.append(separatorFill);
        round.separator.alpha = settings.roundHistory.separator.style.opacity;

        var roundSeparatorPosition = getRoundSeparatorPosition(index, winLabelBounds.width + settings.roundHistory.winBackground.layout[config.getOrientation()].padding[round.type].x, round.type)
        round.separator.x = roundSeparatorPosition.x;
        round.separator.y = roundSeparatorPosition.y;
        round.container.setBounds(roundPosition.x, roundPosition.y, columnWidth, columnHeight);
      });
    }
    function getRoundPosition(index) {
      var position = {x: 0, y: 0};
      if (index !== 0) {
        var previousRound = roundHistory[index - 1];
        var previousRoundBounds = previousRound.container.getBounds();
        console.log(previousRoundBounds);
        switch(config.getOrientation()) {
          case 'portrait':
            var padding = (previousRound.type === 'win') ? 25 : 25;
            position.x = Math.round((previousRound.container.getBounds().width + padding) * index);
            console.log(position.x);
            break;
          default:
            position.y = previousRoundBounds.y + previousRoundBounds.height;
            break;
        }
      }
      return position;
    }
    function getHistoryWinContainerPosition(columnWidth) {
      var position = {
        'x': 0,
        'y': 0
      };
      switch (config.getOrientation()) {
        case 'portrait':
          position.x = 0;
          position.y = settings.roundHistory.winBackground.layout[config.getOrientation()].y;
          break;
        default:
          position.x = 0 - columnWidth / 2 + 15;
          position.y = settings.roundHistory.winBackground.layout[config.getOrientation()].y;
          break;
      }
      return position;
    }
    function getHistoryLabelPosition(label, index, columnWidth, columnHeight, roundType) {
      var position = {
        'x': 0,
        'y': 0
      };
      switch (config.getOrientation()) {
        case 'portrait':
          position.x = columnWidth / 2;
          position.y = settings.roundHistory[label].layout[config.getOrientation()].y;
          break;
        case 'landscape':
          position.x = settings.roundHistory[label].layout[config.getOrientation()].x;
          position.y = columnHeight + settings.roundHistory[label].layout[config.getOrientation()].y;
          break;
        case 'desktop':
          position.x = settings.roundHistory[label].layout[config.getOrientation()].x;
          position.y = columnHeight + settings.roundHistory[label].layout[config.getOrientation()].type[roundType].y;
          break;
        default:
          break;
      }
      return position;
    }
    function getRoundSeparatorPosition(index, columnWidth, roundType) {
      var position = {
        'x': 0,
        'y': 0
      };
      switch (config.getOrientation()) {
        case 'portrait':
          position.x = columnWidth + (roundType === 'win' ? 5 : 15);
          position.y = settings.roundHistory.separator.layout[config.getOrientation()].y;
          break;
        case 'landscape':
          position.x = settings.roundHistory.separator.layout[config.getOrientation()].x;
          position.y = settings.roundHistory.separator.layout[config.getOrientation()].type[roundType].y;
          break;
        case 'desktop':
          position.x = settings.roundHistory.separator.layout[config.getOrientation()].x;
          position.y = settings.roundHistory.separator.layout[config.getOrientation()].type[roundType].y;
          break;
        default:
          break;
      }
      return position;
    }
    function getPreviousRound(index) {
      var bounds = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      var round;

      if (index > 0) {
        round = roundHistory[index - 1];
        bounds = round.container.getBounds();
      }

      return bounds;
    }

    return obj;
  };
})();
