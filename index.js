'use strict';

const Telegram = require('telegram-node-bot');
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram("699208525:AAGUSrZr3nS55tHfL_y-ETinP3T46JKNszA");

// controllers
const HelpController = require('./controller/help');
const CheckListController = require('./controller/checklist');
const OtherwiseController = require('./controller/otherwise');
const LedgerController = require('./controller/ledger');
const WolframController = require('./controller/wolfram');

// construct new controllers
const helpctrl = new HelpController();
const checklistctrl = new CheckListController();
const ledgerctrl = new LedgerController();
const otherwisectrl = new OtherwiseController();
const wolframctrl = new WolframController();

// command routes
tg.router

// start and help
.when(new TextCommand('/start', 'startCommand'), helpctrl)
.when(new TextCommand('/help', 'helpCommand'), helpctrl)

// checklist
.when(new TextCommand('/add', 'addCommand'), checklistctrl)
.when(new TextCommand('/drop', 'dropCommand'), checklistctrl)
.when(new TextCommand('/swap', 'swapCommand'), checklistctrl)
.when(new TextCommand('/checklist', 'checklistCommand'), checklistctrl)

// expenses
.when(new TextCommand('/setbudget', 'setbudgetCommand'), ledgerctrl)
.when(new TextCommand('/budget', 'budgetCommand'), ledgerctrl)
.when(new TextCommand('/expenses', 'expensesCommand'), ledgerctrl)
.when(new TextCommand('/pay', 'payCommand'), ledgerctrl)
.when(new TextCommand('/wallet', 'walletCommand'), ledgerctrl)
.when(new TextCommand('/reset', 'resetCommand'), ledgerctrl)

// wolfram
.when(new TextCommand('/query', 'queryCommand'), wolframctrl)
.otherwise(otherwisectrl);
