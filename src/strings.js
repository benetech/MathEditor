import * as dayjs from 'dayjs';

import LocalizedStrings from 'react-localization';

const now = dayjs();


class Locales {
    constructor() {
        this.strings = new LocalizedStrings({
            en: {
                accessibility: 'Accessibility',
                accessible_to_all: 'Accessible to ALL Learners',
                actions_for_this_problem_set: 'Actions for this Problem Set',
                add_problem: ' Add Problem',
                add_problem_button_title: 'Add a new problem (⌨: shift+enter)',
                add_problem_equation: '+',
                add_problem_set: 'New Problem Set',
                add_problem_title: 'Add new Problem',
                add_problems: ' Add problem(s) to Problem Set',
                add_problems_new_set: ' Add problem(s) to new Problem Set',
                add_step: ' Add step',
                add_step_button_title: 'Clean up the cross outs and start a new step (⌨: shift+enter)',
                add_step_intro: 'Clean-up your work and start a new step.',
                added_problem_at_index: 'Added new problem in position {index}',
                adding_a_problem_set: 'Adding a Problem to a Set',
                adding_a_problem_set_steps: [
                    'Once you\'re in a problem set that you control, select "Add new problem"',
                    'Type in the math equation in the first text box.',
                    'Enter the math problem prompt in the second text box.',
                    'Select "Add Problem" to add this problem to your set.',
                    'Repeat steps 2-4 until you have added all of your problems.',
                    'All problems are listed above the math editor in the section titled "Add problem(s) to Problem Set". You can rearrange these using the two corresponding arrow buttons after each problem.',
                    'Select "Done" to return to your problem set.',
                ],
                adding_a_problem_set_note: 'You may add more problems at any time.',
                adding_steps_to_problems: 'Adding Steps and Explanations to a Problem.',
                adding_steps_to_problems_steps: [
                    'Open the problem you wish to solve',
                    'Step 1 has the starting equation and prompt ready for you.',
                    'Begin working in step 2.  Change the equation and explain your work for the step and select "add step"',
                    'Add as many steps as you need to solve the problem.  When it’s completed, select the "Finished" button at the bottom of the page',
                ],
                alertAutoClose: 'Alert close time (in secs)',
                all_problem_sets: 'All Problem Sets',
                all_problems: ' All Problems',
                allow_educators_to_duplicate: 'Allows eductators to duplicate and re-use this problem set',
                allow_others_to_see: 'Allows others to see your work',
                allow_students_to_see: 'Allows students to answer questions',
                archive: 'Archive',
                archived_problem_set: 'Archived Problem Set - {title}',
                archived_problem_set_failure: 'Failed to archive Problem Set - {title}',
                archived_sets: 'Archived Sets',
                archived_sets_empty: 'No Archived Sets',
                archived_solutiom_set: 'Archived Solution Set - {title}',
                archived_solutiom_set_failure: 'Failed to archive Solution Set - {title}',
                assign: 'Assign:',
                assign_with_a_link: 'Assign with a link: ',
                back: 'Go back',
                back_2: 'Back',
                back_to_problem_page: 'Go back to all problems',
                backslash: 'backslash ',
                bang: 'exclamation point',
                benefits_of_logging_in: 'Benefits of logging in',
                benefits_of_signing_up: 'Benefits of signing up',
                benetech: 'Benetech',
                benetech_empowers: 'Benetech Mathshare empowers students to solve math problems and show their work so that teachers and students can see how they got there.',
                benetech_initiative: 'Benetech Initiative',
                benetech_logo: 'Benetech Logo',
                beta: 'beta',
                cancel: ' Cancel',
                cancel_edit_button_title: 'Cancel edit',
                cancel_edit_step: ' Cancel edit',
                cancel_edit_step_intro: 'Cancel edit.',
                carrot: 'carrot',
                change_math_symbols: 'Change math symbols',
                choose_one: 'Choose one',
                choose_palettes_title: 'Select button palettes available for this problem set',
                choose_palettes_to_add_equations: 'Please choose palettes that you will use to add equations',
                clean_up_and_add_step: 'Clean up and add new step',
                cleanup: '(cleanup)',
                clear_all: ' Clear all',
                clear_all_title: 'Clear all steps',
                clear_sketchpad: 'Clear the sketchpad',
                close: ' Close',
                comma: 'comma',
                completed: 'Completed',
                confirm: 'Confirm',
                confirmation_modal_sure_to_remove_problem: 'Are you sure you want to delete this problem?',
                confirmation_modal_unsaved_title: 'You have unsaved changes, do you wish to save?',
                connect: 'Connect',
                contact_us: ' Contact Us',
                continue_without_signing_in: 'Continue to Mathshare without logging in',
                continue_without_signing_up: 'Continue to Mathshare without signing up',
                copy: ' Copy',
                copy_link_url: ' Copy link',
                copy_this_link: 'Copy this link to the problem set and give to your students',
                copy_work_link: 'Copy Work Link',
                copying_problem_sets: 'Copying Problem Sets',
                copying_problem_sets_steps: [
                    'Open the problem set you would like to duplicate',
                    'Select the "more options" ellipses button next to the problem set title',
                    'Select "Duplicate Problem Set"',
                ],
                copying_problem_sets_note: 'If you would like to re-use a problem set created by someone else you must first duplicate it. After you have duplicated the problem set you can edit it as needed',
                copyright: `Copyright ${new Date().getFullYear()} Benetech. All rights reserved.`,
                create_a_problem_set: 'Create a Problem Set',
                created_problem_set: 'Problem Set has been created',
                creating_a_problem_set: 'Creating a Problem Set',
                creating_a_problem_set_steps: [
                    'From the Mathshare dashboard, select "Create a Problem Set". You may also create a new problem set by opening the "Help" menu and then selecting "Create a Problem Set"',
                    'Customize the math palettes you want available in the set if needed and then select "Next"',
                    'Your problem set has been created. You may now add problems, change the title of the problem set, or share it.',
                ],
                current_problem: 'Current Problem',
                current_problems: 'Current Problems',
                dash: 'minus',
                dashboard: 'Dashboard',
                delete: 'Delete',
                delete_step: ' Delete Step',
                delete_this_step: 'Delete this Step',
                deleting_a_step: 'Deleting a Step',
                deleting_a_step_note: 'If you want to delete a step, select the button "Delete this Step" to the right of the prompt. Deleting a step will not affect other steps.',
                deleting_and_editing: 'Deleting and Editing Problems',
                deleting_and_editing_steps: [
                    'Select the "more options" ellipses button in the lower right corner of the problem you wish to modify.',
                    'To delete or remove the problem select "Remove Problem"',
                    'To edit the problem select "Edit Problem"',
                ],
                describe_your_role: 'Which best describes your role?',
                describe_your_work: 'Describe your work',
                diagram_center: 'DIAGRAM Center',
                dictate: 'Dictate',
                dictatation_complete: 'Dictation complete',
                dictatation_started: 'Dictation started',
                discard_changes: ' Discard Changes',
                done: ' Done',
                dot: 'dot',
                dropdown_collapsed: 'Dropdown collapsed',
                duplicate: 'Duplicate',
                duplicate_set: 'Duplicate to edit/share',
                edit: 'Edit',
                edit_equation: 'edit equation',
                edit_link_label: 'URL for editing: ',
                edit_problem: 'Edit Problem',
                edit_problem_set: 'Edit Problem Set',
                edit_this_step: 'Edit this Step',
                edit_title: 'Edit Problem Set Title',
                editing_a_step: 'Editing a Step',
                editing_a_step_note: 'If you ever need to edit a step, select the button "Edit this Step" to the right of the prompt. Edits to one step will not affect other steps.',
                editor_actions: 'Editor Actions',
                email: 'Email',
                enter_your_email: 'Enter your email',
                equation: 'Equation',
                error: 'Error',
                example: 'example',
                example_edit_code: 'Here you could find an URL with edit code',
                example_problem: 'Example Problem',
                example_share_code: 'Here you could find an URL with share code',
                explore_problem_set: 'Explore Problem Set Library',
                failure: 'Failure',
                faster: 'Faster',
                ferpa_coppa: 'FERPA/COPPA',
                filter: 'Filter',
                finish: ' Finish',
                finish_edit: 'Finish Edit',
                finished: 'finished',
                font: 'Font',
                footer: 'Footer',
                footer_description: ` initiative supported by the U.S. Department of Education, Office of Special Education Programs (Cooperative Agreement #H327B100001). Opinions expressed herein are those of the authors and do not necessarily represent the position of the U.S. Department of Education. This website is copyright © 2012-${now.format('YYYY')}, Beneficent Technology, Inc.`,
                free_and_open_source: 'Free and Open Source',
                gender: 'Gender',
                get_notified_about_mobile: ' Get notified about mobile',
                getting_started_equation: 'Click here to see an example problem and learn how to use the editor',
                getting_started_title: ' Getting Started',
                go_to_app: 'Go to App',
                go_to_main_content: 'Skip to Main Content',
                google: 'Google',
                google_classroom: 'Google Classroom',
                google_logo: 'Google Logo',
                grade: 'Grade',
                grade_and_role_warning: 'Please make sure a grade and role is selected',
                grade_of_study: 'What grade do you study in',
                grade_of_work: 'What grade do you work with?',
                hash: '#',
                header: ' Navigation ',
                help_center: ' Help Center',
                help_students: 'Help students show and organize their math work',
                history_data_intro: 'Review your work. The trash icon also allows you to delete and rework a prior step.',
                i_m_student: "I'm a Student",
                i_m_teacher: "I'm a Teacher",
                idea_logo_alt: 'IDEA Logo',
                if_you_want_a_link: "If you want a link to submit your finished work, use the 'Share' button instead.",
                if_you_want_to_continue: "If you want to continue working on it later, use the 'Save' button instead",
                include_my_work: 'Include my work when sharing',
                info: 'Info',
                is_a: ' is a ',
                join_us_in_1: 'Join us in making math more accessible for all students by becoming a partner. Mathshare is free and open source. Integrate it into your program or become a development partner',
                join_us_in_2: 'complete this form',
                join_us_in_3: 'and we will be in touch soon.',
                keyboard: 'shortcut is ',
                keyboard_shortcuts: 'Keyboard shortcuts',
                letterSpacing: 'Letter Spacing',
                lineHeight: 'Line Height',
                link: ' Link',
                lms_integration: 'LMS Integration',
                load_more: 'Load More',
                loading: 'Loading...',
                loading_2: 'Loading ',
                login_something_wrong: 'Sorry, something went wrong. Your user profile could not be retrieved. You can try to sign in again or return to MathShare as a guest.',
                login_using: 'Log in using',
                logo: 'logo',
                math: 'math',
                math_button_invalid_selection: 'Selection must contain only numbers and operators',
                math_button_select_exp: 'You must select an arithmetic expression for calculation',
                math_editor: 'Math editor',
                math_input_buttons: 'math input buttons',
                math_palette: 'Select Button Palettes',
                mathshare_benetech: 'Benetech Mathshare',
                mathshare_gif: 'animation showing math with synchronized highlighting',
                mathshare_is_a: 'Mathshare is a',
                mathshare_is_a_free: 'Mathshare is a free, open source tool developed by Benetech, a nonprofit that empowers communities with software for social good. Mathshare’s mission is to make math accessible for all students. Mathshare is free for schools to use and for learning management systems to integrate into their platforms.',
                mathshare_logo: 'Mathshare Logo, a Benetech Initiative',
                mathshare_open_source: 'Image showing open source logo',
                mathshare_privacy_1: 'Mathshare shares the Benetech privacy policy which is found at',
                mathshare_privacy_2: '. When signing in using an LMS or other sign in service we request and store the following information from the service. First and last name, email, and user ID. Mathshare uses this data to maintain or administer our Services, perform business analyses, or for other internal purposes to improve the quality of our business, the Services, and other products and services we offer. We may use information provided by you in other manners, as otherwise described to you at the point of collection or pursuant to your consent. Data is stored securely in the United States.',
                mathshare_privacy_updated: 'Updated 7-2-19',
                mathshare_supported_lms: 'several logos of several LMS vendors, including Canvas, Google Classroom, Schoology, Moodle, OneNote, and Blackboard',
                mission: 'Our mission is to make math accessibility free and open to all students.',
                mobile_not_supported: 'Mobile is not currently supported',
                more_options: 'More Options',
                more_options_for: 'More Options for {title}',
                ms: 'Microsoft',
                ms_logo: 'Microsoft Logo',
                ms_team: 'Microsoft Teams',
                my_created_sets: 'My Created Sets',
                my_solution_sets: 'My Solution Sets',
                my_steps: 'My Steps',
                my_work: 'My Work',
                new_problem: ' New Problem',
                new_problem_set: 'New Problem Set',
                next: 'Next',
                next_problem: 'Next problem ',
                no_description_warning: 'Please provide a description of your work.',
                no_more_problem_sets: 'No more problem sets found',
                no_palettes_chosen_warning: 'Please select at least one palette',
                no_problem_equation_or_image_and_title_warning: 'Please provide problem title and problem equation or an image',
                no_problem_equation_or_image_warning: 'Please provide a problem equation or an image.',
                no_problem_title_warning: 'Please provide a problem title.',
                no_problems_added_yet: 'No Problems Yet',
                no_recent_sets: 'You have not yet created any sets.',
                no_step_number: 'No step number ',
                not_saved_yet: 'Not saved yet.',
                number: 'Number',
                only_fill_if_in_us: 'Only fill out if in the U.S.',
                open_image: 'Open image',
                open_mathshare: 'Open MathShare',
                open_source: 'Open Source',
                opens_in_new_tab: '(opens new tab)',
                opens_in_new_window: '(opens in new window)',
                other: 'Other',
                overview: 'Overview',
                page_was_not_found: 'We are sorry but the page you are looking for does not exist.',
                page_was_not_found_info: 'Please visit the homepage or contact us about the problem.',
                page_was_not_found_title: 'Page Not Found',
                partners: 'Partners',
                partnerships: 'Partnerships',
                personalization: 'Personalization',
                personalization_config_has_been_updated: 'Personalization config has been updated',
                personalization_settings: 'Personalization Settings',
                please_check_account_info: 'Please check through your account information to make sure it\'s accurate',
                please_enter_valid_email: 'Please enter a valid email',
                please_fill_your_details: 'Please fill your details',
                policies: 'Policies',
                pre_made_sets: 'Pre-made Sets',
                previous_problem: ' Previous problem',
                privacy_policy: 'Privacy Policy',
                problem_image: 'Problem image',
                problem_no: 'Problem {no}',
                problem_row_controls: 'Problem row controls',
                problem_saved_success_message: 'Problem saved.',
                problem_set_1: 'Problem Set 01',
                problem_set_2: 'Problem Set 02',
                problem_set_3: 'Problem Set 03',
                problem_set_cannot_be_duplicated: 'The problem set cannot be duplicated',
                problem_set_completed_tick: 'Problem Set completed tick',
                problem_set_completed_speech: '{completedCount} of {totalCount}',
                problem_set_controls: 'Problem set controls:',
                problem_set_library: 'Problem Set Library',
                problem_sets: 'Problem Sets',
                problems: 'Problems',
                problems_in_this_set: 'Problems in this Set',
                problems_to_solve: ' Problems to solve ',
                prompt: 'Prompt',
                provide_feedback: ' Give Feedback',
                reason: 'reason',
                redirecting: 'Redirecting',
                redirecting_to_fill: 'Redirecting to fill your information',
                redirecting_to_review: 'Redirecting to review your information',
                recent_sets: 'Recent Sets',
                remove_problem: 'Remove Problem',
                require_explanations: 'Require explanations',
                required: 'required',
                reset_problem_set: 'Reset Problem Set',
                resources: 'Resources',
                restore: 'Restore',
                restore_success: 'Restored Problem Set - {title}',
                restore_failure: 'Failed to Restore Problem Set - {title}',
                return_to_mathshare: 'Return to MathShare as a guest',
                return_to_your_problem_later: 'You are not logged in. Save this link to return to your problem set later',
                return_to_your_work_later: 'You are not logged in. Save this link to return to your work later',
                review_account_info: 'Review Account Info',
                save: ' Save',
                save_changes: ' Save Changes',
                save_intro: 'Save your work or close out to try again from the beginning.',
                save_text: 'Save Text: ',
                save_work_by_signing_in: 'Save where you left by signing in',
                scratchpad: ' Sketch',
                scratchpad_alt: 'Problem sketch',
                scratchpad_enlarge: 'Enlarge sketch',
                screenshot_math_interface: 'Screen shot showing math share interface',
                screenshot_step_by_step: 'Screenshot showing example problem being solved step by step',
                select_a_problem: 'Select a problem to try out the MathShare Editor',
                select_a_problem_header: "Benetech's MathShare Editor (alpha)",
                select_symbol_or_scratchpad: 'Select symbol or scratchpard tab',
                setup_your_account: "Let's setup your account",
                share: ' Share',
                share_link: 'Share Link: ',
                share_my_answers: 'Share My Answers',
                share_on: 'Share on',
                share_on_twitter: 'Share on Twitter',
                share_permalink: 'Share Permalink',
                share_problem_set: 'Share Problem Set',
                share_with_teachers: ' Share with Teachers',
                share_with_teachers_text: 'Check out my #accessible math problems made in @mathshare. Supports learning styles, special needs and #4Cs. ',
                share_your_problem_set: 'Share your problem set through Google Classroom or Microsoft Teams, or share using the link below.',
                sharing_sets: 'Sharing Sets with Others',
                sharing_sets_with_students: 'Sharing Sets with Students',
                sharing_sets_with_students_steps: [
                    'To share a problem set, go to the "Problem Set Actions" in the upper right corner of the problem set page. This should show options for Share Permalink, Google Classroom, and Microsoft Teams.',
                    'When someone opens the link you shared, they will be able to answer the problems and share their work back with you.',
                    'Anyone you share with in this way will not be able to edit the underlying problems.',
                ],
                sharing_sets_with_teachers: 'Sharing Sets with Other Educators',
                sharing_sets_with_teachers_note: 'To allow others to duplicate your problem set, send them the "Share Problem Set" link. They can then make their own copy of the problem set.',
                sharing_solution_sets: 'Sharing/Turning in Answered Problem Sets',
                sharing_solution_sets_note: 'If you opened a problem set shared to you by someone else, you can share your completed problem set with these steps.',
                sharing_solution_sets_steps: [
                    'To share a problem set, go to the "Problem Set Actions" in the upper right corner of the problem set page. This should show options for Share Permalink, Google Classroom, and Microsoft Teams.',
                    'When someone opens the link you shared, they will be able to view your steps.',
                    'Anyone you share with in this way will not be able to change your work.',
                ],
                sharing_your_answered_set: 'Sharing Your Answered Problem Set',
                sharing_your_answered_set_steps: [
                    'To share a problem set, go to the "Problem Set Actions" in the upper right corner of the problem set page. This should show options for Share Permalink, Google Classroom, and Microsoft Teams.',
                    'When someone opens the link you shared, they will be able to view your steps.',
                    'Anyone you share with in this way will not be able to change your work.',
                ],
                show_their_work: 'Show their work',
                sign_in: 'Log in',
                sign_out: 'Sign Out',
                sign_up: 'Sign up',
                sign_up_using: 'Sign up using',
                sketchpad_loading_warning: "Sketchpad library wasn't loaded properly",
                slower: 'Slower',
                solving_problems: 'Solving Problems',
                speak: 'Speak ',
                speech_recongition_error: 'Speech recognition is not supported on your device',
                speech_recongition_permission_denied: "We couldn't access your audio stream",
                speed: 'Speed',
                start_speaking: 'Start Speaking',
                step: 'Step',
                step_after_cleanup: 'step, after cleanup',
                step_no: 'Step {no}',
                step_tts_text: 'Step {stepNo}. {mathEquation}. {explanation}',
                steps: 'Steps',
                stop_dictation: 'Stop Dictation',
                stop_speaking: 'Stop Speaking ',
                student: 'Student',
                students_can_solve: 'Students can solve equations step-by-step and add notes to explain their thinking.',
                students_visit: 'Students visit the link below to access the problem set',
                students_with_and_without: 'Students with and without learning differences can use Mathshare with features like text-to-speech, speech-to-text, and word-level highlighting',
                submit: 'Submit',
                submit_a_partnership: 'Submit a partnership request through our contact form',
                submit_problem_link: 'Submit Problem Link: ',
                submit_to_partner: 'Submit to {partner}',
                submit_to_partner_success: 'Submitted Sucessfully',
                submit_to_partner_failure: 'Unable to submit',
                submit_your_answers: 'Submit your answers to Google Classroom or Microsoft Teams, or you can also share your finished work with the link below.',
                success: 'Success',
                successfull_update_message: 'The step has been updated.',
                successfully_copied: 'Successfully copied to clipboard',
                sure: 'Sure?',
                system_default: 'System Default',
                switch_to_sketchpad: 'Switch to the sketchpad view',
                switch_to_symbols: 'Switch to the symbols view',
                symbols: ' Symbols',
                teacher: 'Teacher',
                tos: 'Terms of Service',
                thanks_for_details: 'Thanks for sharing your details',
                thanks_for_mobile_notfiy: 'Thanks, we will notify you once we add mobile compatibility',
                the: 'The',
                title: 'Title',
                title_max_length: 'Max length of title is 2000 characters',
                to_mathshare_twitter: 'Twitter',
                to_mathshare_youtube: 'YouTube',
                to_track: 'to track your problem sets',
                tour_add_step: 'Clean-up your work and start a new step.',
                tour_annotation: 'Describe your work by typing directly or using the microphone to record an explanation of your work (required).',
                tour_clear_all: 'You can clear all steps here.',
                tour_edit: 'Use this link to continue your work in the future.',
                tour_editor: 'Type or edit the equation using your keyboard and the math keys below. Try using the cross out, replace, and calc buttons to help show your work.',
                tour_input_containers: 'You can switch between symbols palette and the sketchpad.',
                tour_math_step_part_1: 'Review your work. The trash icon',
                tour_math_step_part_2: 'allows you to delete and rework a prior step. You can also edit the step, using',
                tour_save: "Save your work so you don't lose it.",
                tour_share: 'Share your solution with others.',
                try_now: 'Try now',
                tts: 'Text to Speech',
                tts_error: 'Unable to play the audio',
                tts_hint: 'Use the microphone button or type to explain your work',
                tts_hint_add_problem: 'Use the microphone button or type to add problem prompt (required)',
                tts_intro: 'Describe your work by typing directly \nor using the microphone to record an explanation of your work (required).',
                tts_intro_add_problem: 'Describe problem titlw by typing directly \nor using the microphone to record a title of problem (required).',
                tutorial: ' Tutorial',
                twitter: 'Twitter',
                type_math_here: 'type math here',
                ui: 'UI Personalization',
                unable_to_load: 'Unable to load problem sets',
                unable_to_update_palettes: 'Unable to update palettes',
                underbar: 'line',
                undo_last_action: 'Undo Last Action (⌨: shift+backspace)',
                undo_step: ' Undo',
                untitled_problem_set: 'Untitled Problem Set',
                update_problem: ' Update Problem',
                update_problem_button_title: 'Update the problem (⌨: shift+enter)',
                update_problem_intro: 'Update the problem.',
                update_step: ' Update Step',
                update_step_button_title: 'Update the step (⌨: shift+enter)',
                update_step_intro: 'Update the step.',
                update_title: 'Problem Set Title',
                updated_palettes: 'Updated Palettes',
                upload: 'Upload',
                upload_no_file_warning: 'Please select a file',
                use_on_your_lms: 'Use on your schools LMS (learning management system) through assignment links, with native integrations and single sign on (SSO) coming soon.',
                use_this_link: 'Use this link to save your work and return to it later',
                use_this_link_share: 'Use this link to share your',
                user_profile: 'User Profile',
                view_as_student: ' View as Student',
                view_problem_description: 'view problem description',
                view_sketch: 'View Sketch for Problem {no}',
                warning: 'Warning',
                where_are_you_from: 'Where are you from?',
                who_are_you: 'Who are you?',
                work: 'work',
                work_area_heading: 'math and description of your work',
                work_area_intro: 'Type or edit the equation using your keyboard and the math keys below. \nTry using the cross out, replace, and calc buttons to help show your work.',
                work_link: 'Work Link',
                work_link_copied: 'Work link copied to clipboard.',
                workshop_materials: 'Workshop Materials',
                year_of_birth: 'Year of Birth',
                yes: ' Yes',
                you_are_now_on: 'You are now on the "{pageTitle}" page',
                you_are_signed_in: 'You are now signed in as {user}',
                you_have_been_logged_out: 'You have been logged out',
                your_work_cannot: 'Your work cannot be edited',
                youtube: 'YouTube',
            },
            es: {},
        });
    }
}

export default (new Locales());
