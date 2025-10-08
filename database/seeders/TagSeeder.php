<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'Coming of Age', 'description' => 'A story focused on personal growth and maturity.', 'image' => 'child'],
            ['name' => 'Redemption', 'description' => 'Centers around a character seeking forgiveness or salvation.', 'image' => 'dove'],
            ['name' => 'Revenge', 'description' => 'Driven by vengeance or the desire for retribution.', 'image' => 'fist-raised'],
            ['name' => 'Betrayal', 'description' => 'Involves deceit, broken trust, and emotional conflict.', 'image' => 'user-slash'],
            ['name' => 'Survival', 'description' => 'Characters struggling to endure extreme conditions or threats.', 'image' => 'campground'],
            ['name' => 'Hope', 'description' => 'Themes of optimism, perseverance, and faith.', 'image' => 'sun'],
            ['name' => 'Tragedy', 'description' => 'A narrative leading to sorrowful or disastrous outcomes.', 'image' => 'mask-sad'],
            ['name' => 'Friendship', 'description' => 'Explores bonds between characters built on loyalty and trust.', 'image' => 'hands-helping'],
            ['name' => 'Found Family', 'description' => 'Characters form deep family-like connections outside blood relations.', 'image' => 'users'],
            ['name' => 'Love Triangle', 'description' => 'A romantic conflict between three people.', 'image' => 'heart-broken'],
            ['name' => 'Dark', 'description' => 'Features grim tones, moral ambiguity, or unsettling atmospheres.', 'image' => 'moon'],
            ['name' => 'Lighthearted', 'description' => 'Playful, cheerful, and uplifting in tone.', 'image' => 'smile-beam'],
            ['name' => 'Whimsical', 'description' => 'Filled with imaginative charm and playful fantasy.', 'image' => 'feather'],
            ['name' => 'Gritty', 'description' => 'Realistic and raw portrayal of harsh circumstances.', 'image' => 'grip-lines'],
            ['name' => 'Suspenseful', 'description' => 'Tense pacing and uncertainty that keeps readers on edge.', 'image' => 'hourglass-half'],
            ['name' => 'Epic', 'description' => 'Grand scope with vast worlds and high-stakes conflicts.', 'image' => 'mountain'],
            ['name' => 'Emotional', 'description' => 'Deeply moving, evoking strong feelings in readers.', 'image' => 'heart'],
            ['name' => 'Satirical', 'description' => 'Uses humor and irony to criticize or mock.', 'image' => 'laugh-squint'],
            ['name' => 'Tense', 'description' => 'Maintains high emotional or narrative pressure throughout.', 'image' => 'bolt'],
            ['name' => 'Urban', 'description' => 'Stories set in modern city environments.', 'image' => 'city'],
            ['name' => 'Rural', 'description' => 'Takes place in countryside or small-town settings.', 'image' => 'tractor'],
            ['name' => 'Medieval', 'description' => 'Inspired by historical or fantasy medieval worlds.', 'image' => 'shield-alt'],
            ['name' => 'Futuristic', 'description' => 'Set in advanced technological or sci-fi settings.', 'image' => 'satellite-dish'],
            ['name' => 'Post-Apocalyptic', 'description' => 'Depicts life after global catastrophe or societal collapse.', 'image' => 'skull-crossbones'],
            ['name' => 'Alternate History', 'description' => 'Reimagines historical events with different outcomes.', 'image' => 'book-open'],
            ['name' => 'Steampunk', 'description' => 'Combines Victorian aesthetics with steam-powered technology.', 'image' => 'cogs'],
            ['name' => 'Mythic', 'description' => 'Draws from legends, folklore, and ancient mythology.', 'image' => 'torii-gate'],
            ['name' => 'Supernatural', 'description' => 'Involves ghosts, spirits, or phenomena beyond natural laws.', 'image' => 'ghost'],
            ['name' => 'Magic', 'description' => 'Focuses on mystical forces and spellcraft.', 'image' => 'wand-sparkles'],
            ['name' => 'Time Travel', 'description' => 'Characters move across different eras or timelines.', 'image' => 'clock-rotate-left'],
            ['name' => 'Parallel Worlds', 'description' => 'Explores multiple realities or alternate universes.', 'image' => 'arrows-rotate'],
            ['name' => 'Superpowers', 'description' => 'Characters possess extraordinary physical or mental abilities.', 'image' => 'bolt-lightning'],
            ['name' => 'Aliens', 'description' => 'Encounters with extraterrestrial beings or civilizations.', 'image' => 'meteor'],
            ['name' => 'Monsters', 'description' => 'Creatures of legend or horror challenge humanity.', 'image' => 'dragon'],
            ['name' => 'Undead', 'description' => 'Features zombies, vampires, or reanimated beings.', 'image' => 'skull'],
            ['name' => 'Gods', 'description' => 'Involves divine beings, pantheons, and celestial power.', 'image' => 'om'],
            ['name' => 'Prophecy', 'description' => 'Characters guided or burdened by foretold destinies.', 'image' => 'scroll'],
            ['name' => 'Curses', 'description' => 'Magic or fate brings misfortune and trials.', 'image' => 'hand-sparkles'],
            ['name' => 'Ancient Relics', 'description' => 'Focuses on powerful artifacts with history and mystery.', 'image' => 'gem'],
            ['name' => 'Political Intrigue', 'description' => 'Centers on manipulation, schemes, and power struggles.', 'image' => 'chess'],
            ['name' => 'War', 'description' => 'Depicts armed conflict and the human cost of battle.', 'image' => 'helmet-safety'],
            ['name' => 'Rebellion', 'description' => 'Stories about resistance against authority or oppression.', 'image' => 'flag'],
            ['name' => 'Heist', 'description' => 'Plots revolve around elaborate thefts and cunning plans.', 'image' => 'mask'],
            ['name' => 'Investigation', 'description' => 'Focused on solving mysteries or uncovering truths.', 'image' => 'magnifying-glass'],
            ['name' => 'Quest', 'description' => 'Characters embark on a journey to achieve a significant goal.', 'image' => 'map'],
        ];

        foreach($tags as $tag){
            Tag::factory()->create($tag);
        }
    }
}
